package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.UserDto;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtTokenProvider {

    String generateToken(UserDto userDto);

    Authentication getAuthentication(String token);

    boolean validateToken(String token);

    String resolveToken(HttpServletRequest req);

}
