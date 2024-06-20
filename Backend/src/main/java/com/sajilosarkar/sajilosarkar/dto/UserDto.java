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

    private String image;

    public UserDto(String streetAddress1, String streetAddress2, String city, Integer id, String firstName, String lastName, String email, String password, String phone, String image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.streetAddress1 = streetAddress1;
        this.streetAddress2 = streetAddress2;
        this.city = city;
        this.image = image;
    }
}
