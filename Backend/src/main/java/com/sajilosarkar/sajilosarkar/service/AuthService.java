package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.AuthRequest;
import com.sajilosarkar.sajilosarkar.dto.AuthResponse;

public interface AuthService {
    AuthResponse authenticate(AuthRequest authenticateRequest);
}
