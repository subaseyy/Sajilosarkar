package com.sajilosarkar.sajilosarkar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Email;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Integer id;
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    @NotEmpty(message = "Email should not be empty")
    @Email
    private String email;
    @NotEmpty(message = "Password should not be empty")
    private String password;
    @NotEmpty
    private String role;
    
    private String phone;

    private String address;

    private String image;

    private Boolean status;

    public UserDto(Integer id, String firstName, String lastName, String email, String password, String role, Boolean status, String address, String phone, String image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.address = address;
        this.phone = phone;
        this.image = image;
    }
}
