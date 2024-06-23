package com.sajilosarkar.sajilosarkar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Integer id;
    
    @NotEmpty(message = "First name should not be empty")
    private String firstName;
    
    @NotEmpty(message = "Last name should not be empty")
    private String lastName;
    
    @NotEmpty(message = "Email should not be empty")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotEmpty(message = "Password should not be empty")
    private String password;
    
    @NotEmpty(message = "Phone should not be empty")
    private String phone;
    
    private String streetAddress1;

    private String streetAddress2;

    @NotEmpty(message = "City should not be empty")
    private String city;

    private MultipartFile image;
    private String getImage;

    private String role;

}
