package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.config.JwtService;
import com.sajilosarkar.sajilosarkar.dto.LoginDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.entity.Role;
import com.sajilosarkar.sajilosarkar.entity.User;
import com.sajilosarkar.sajilosarkar.repository.RoleRepository;
import com.sajilosarkar.sajilosarkar.repository.UserRepository;
import com.sajilosarkar.sajilosarkar.service.UserService;
import com.sajilosarkar.sajilosarkar.util.PasswordEncoderUtil;
import lombok.RequiredArgsConstructor;

import org.apache.commons.io.FilenameUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/media/images/users";

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveUser(UserDto userDto) {
        User user = convertToEntity(userDto);
        userRepository.save(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveUser(UserDto userDto, MultipartFile image) {
        User user = convertToEntity(userDto);
        if (image != null && !image.isEmpty()) {
            try {
                String filename = FilenameUtils.getName(image.getOriginalFilename());
                Path filePath = Paths.get(UPLOAD_DIRECTORY, filename);
                Files.write(filePath, image.getBytes());
                user.setImage(filename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image", e);
            }
        }
        userRepository.save(user);
    }

    private User convertToEntity(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userDto.getPassword()));
        user.setPhone(userDto.getPhone());
        user.setStatus(true);
        user.setAddress(userDto.getStreetAddress1() + " " + userDto.getStreetAddress2() + " " + userDto.getCity());
    
        // Handle the image field
        if (userDto.getImage() != null && !userDto.getImage().isEmpty()) {
            @SuppressWarnings("null")
            String fileName = StringUtils.cleanPath(userDto.getImage().getOriginalFilename());
            // Assuming UPLOAD_DIRECTORY is defined as your upload directory path
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, fileName);
            try {
                Files.write(fileNameAndPath, userDto.getImage().getBytes());
                user.setImage(fileName); // Set the image filename in the User entity
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file " + fileName, e);
            }
        }
    
        return user;
    }

    @Override
    public UserDto findUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(this::mapToUserDto).orElse(null);
    }

    @Override
    public UserDto findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(this::mapToUserDto).orElse(null);
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUserById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateUserPassword(Integer id, String newPassword) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(PasswordEncoderUtil.getInstance().encode(newPassword));
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void assignRoleToUser(Integer userId, Integer roleId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with id: " + roleId));

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getRoles().add(role);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found with id: " + userId);
        }
    }

    @Override
    public String authenticateUser(LoginDto loginDto) throws AuthenticationException {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return jwtService.generateToken(userDetails);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password", e);
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed", e);
        }
    }

    private UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        String[] str = user.getName().split(" ");
        if (str.length > 1) {
            userDto.setFirstName(str[0]);
            userDto.setLastName(str[1]);
        } else {
            userDto.setFirstName(user.getName());
            userDto.setLastName("");
        }
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());

        // Set role names as a comma-separated string
        userDto.setRole(user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.joining(", ")));

        return userDto;
    }

//    public String getUPLOAD_DIRECTORY() {
//        return UPLOAD_DIRECTORY;
//    }
//
//    public RoleRepository getRoleRepository() {
//        return roleRepository;
//    }
//
//    public UserRepository getUserRepository() {
//        return userRepository;
//    }

}
