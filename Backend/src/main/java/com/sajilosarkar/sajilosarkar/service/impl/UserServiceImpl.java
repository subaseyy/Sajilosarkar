package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.LoginDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.entity.Role;
import com.sajilosarkar.sajilosarkar.entity.User;
import com.sajilosarkar.sajilosarkar.repository.RoleRepository;
import com.sajilosarkar.sajilosarkar.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import com.sajilosarkar.sajilosarkar.service.JwtService;
import com.sajilosarkar.sajilosarkar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    @Override
    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user = userRepository.save(user);
        userRepository.saveRoleUSer(1, user.getId());
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
    public void updateUserPassword(Integer id, String newPassword) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
    }

    @Override
    @Transactional
    public void assignRoleToUser(Integer userId, Integer roleId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Role role = roleRepository.findById(Long.valueOf(roleId))
                .orElseThrow(() -> new IllegalArgumentException("Role not found with id: " + roleId));

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getRoles().add(role); // Assuming roles are stored in a collection in User entity
            user = userRepository.save(user);
            userRepository.saveRoleUSer(1, user.getId());
            // Log info for debugging
            System.out.println("Assigned role with id " + roleId + " to user with id: " + userId);
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
            throw new LockedException("Invalid email or password", e);
        } catch (AuthenticationException e) {
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
        return userDto;
    }
}
