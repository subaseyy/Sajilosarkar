package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.dto.LoginDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    void saveUser(UserDto userDto, MultipartFile image);

    UserDto findUserById(Integer id);

    UserDto findUserByEmail(String email);

    List<UserDto> findAllUsers();

    void updateUserPassword(Integer id, String newPassword);

    void deleteUserById(Integer id);

    void assignRoleToUser(Integer userId, Integer roleId);

    String authenticateUser(LoginDto loginDto);

}
