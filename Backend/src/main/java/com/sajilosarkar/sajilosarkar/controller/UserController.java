package com.sajilosarkar.sajilosarkar.controller;

import com.sajilosarkar.sajilosarkar.dto.LoginDto;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody UserDto userDto, BindingResult result) {
    if (result.hasErrors()) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
    userService.saveUser(userDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully!"));
}

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            String token = userService.authenticateUser(loginDto);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            UserDto userDetail = userService.findUserByEmail(loginDto.getEmail());
            response.put("name", userDetail.getFirstName());
            response.put("role", userDetail.getRole());

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
