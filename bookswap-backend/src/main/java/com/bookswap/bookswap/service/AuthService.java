package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.AuthResponse;
import com.bookswap.bookswap.dto.LoginRequest;
import com.bookswap.bookswap.dto.SignUpRequest;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final FileStorageService fileStorageService;

    public AuthResponse signup(SignUpRequest request, MultipartFile profilePicture) {
        String profilePictureFileName = null;
        if (profilePicture != null && !profilePicture.isEmpty()) {
            profilePictureFileName = fileStorageService.storeFile(profilePicture);
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .profilePictureUrl(profilePictureFileName)
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            // Return a 401 Unauthorized status instead of a 500 error
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        // If authentication is successful, generate a token
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(); // Should not happen if auth is successful
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .build();
    }
}