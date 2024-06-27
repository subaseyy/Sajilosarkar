package com.sajilosarkar.sajilosarkar.controller;

import com.sajilosarkar.sajilosarkar.dto.AuthRequest;
import com.sajilosarkar.sajilosarkar.dto.AuthResponse;
import com.sajilosarkar.sajilosarkar.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authenticateService;

    @PostMapping("/authenticate")
    public AuthResponse authenticate(@RequestBody AuthRequest authenticateRequest) {

        return authenticateService.authenticate(authenticateRequest);
    }

}
