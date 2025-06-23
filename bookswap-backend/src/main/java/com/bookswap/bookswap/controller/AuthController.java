package com.bookswap.bookswap.controller;

import com.bookswap.bookswap.dto.AuthResponse;
import com.bookswap.bookswap.dto.LoginRequest;
import com.bookswap.bookswap.dto.SignUpRequest;
import com.bookswap.bookswap.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(
            @RequestPart("signUpRequest") SignUpRequest signUpRequest,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture) {

        // We use @RequestPart to handle multipart form-data which includes a JSON object and a file
        return ResponseEntity.ok(authService.signup(signUpRequest, profilePicture));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
