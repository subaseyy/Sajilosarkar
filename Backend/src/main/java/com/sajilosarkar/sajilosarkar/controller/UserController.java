package com.sajilosarkar.sajilosarkar.controller;


import com.sajilosarkar.sajilosarkar.dto.LoginDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
// import com.sajilosarkar.sajilosarkar.entity.User;
import com.sajilosarkar.sajilosarkar.service.UserService;
import com.sajilosarkar.sajilosarkar.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private JwtService jwtService;

    private final UserService userService;
    // private final ObjectMapper objectMapper;

    // public UserController(UserService userService, ObjectMapper objectMapper) {
    public UserController(UserService userService) {
        this.userService = userService;
        // this.objectMapper = objectMapper;
    }

@PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(
            @RequestPart("user") UserDto userDto,
            @RequestPart("image") MultipartFile image,
            BindingResult bindingResult,
            HttpServletRequest request) throws IOException {
        
        userService.saveUser(userDto, image);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }


@PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            String token = userService.authenticateUser(loginDto);
            UserDto userDetail = userService.findUserByEmail(loginDto.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("name", userDetail.getFirstName());
            response.put("roles", userDetail.getRole());
            response.put("id", String.valueOf(userDetail.getId()));
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> findUserByEmail(@PathVariable String email) {
        UserDto userDto = userService.findUserByEmail(email);
        return userDto != null ? ResponseEntity.ok(userDto) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Integer id) {
        UserDto userDto = userService.findUserById(id);
        return userDto != null ? ResponseEntity.ok(userDto) : ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> findUserByUsername(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove "Bearer " prefix
        }
        String username = jwtService.extractUsername(token);
        UserDto userDto = userService.findUserByEmail(username);
        return userDto != null ? ResponseEntity.ok(userDto) : ResponseEntity.status(403).build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Map<String, String>> updateUserPassword(@PathVariable Integer id, @RequestParam String newPassword) {
        userService.updateUserPassword(id, newPassword);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully!"));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Map<String, String>> deleteUserById(@PathVariable Integer id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully!"));
    }

    @PostMapping("/{userId}/assignRole")
    public ResponseEntity<Map<String, String>> assignRoleToUser(@PathVariable Integer userId, @RequestParam Integer roleId) {
        userService.assignRoleToUser(userId, roleId);
        return ResponseEntity.ok(Map.of("message", "Role assigned successfully!"));
    }
}
