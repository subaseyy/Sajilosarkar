package com.sajilosarkar.sajilosarkar.controller;

import com.sajilosarkar.sajilosarkar.dto.LoginDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.service.UserService;
import jakarta.validation.Valid;
import com.sajilosarkar.sajilosarkar.service.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Autowired
    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDto userDto) {
        userService.saveUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginDto loginDto) {
        try {
            UserDto userDto = userService.authenticateUser(loginDto);
            if (userDto != null) {
                String token = jwtTokenProvider.generateToken(userDto);
//                String token = "jwtTokenProvider.generateToken(userDto)";
                logger.info("User with email {} logged in successfully", userDto.getEmail());
                return ResponseEntity.ok(token);
            } else {
                logger.warn("Invalid login attempt for email: {}", loginDto.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            logger.error("An error occurred during login attempt", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
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

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<String> updateUserPassword(@PathVariable Integer id, @RequestParam String newPassword) {
        userService.updateUserPassword(id, newPassword);
        return ResponseEntity.ok("Password updated successfully!");
    }

    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Integer id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    @PostMapping("/{userId}/assignRole")
    public ResponseEntity<String> assignRoleToUser(@PathVariable Integer userId, @RequestParam Integer roleId) {
        userService.assignRoleToUser(userId, roleId);
        return ResponseEntity.ok("Role assigned successfully!");
    }
}
