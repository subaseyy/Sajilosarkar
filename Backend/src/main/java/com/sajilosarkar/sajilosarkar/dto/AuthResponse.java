package com.sajilosarkar.sajilosarkar.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private Integer id;
    private String name;
}
