package com.bookswap.bookswap.controller;

import com.bookswap.bookswap.dto.UserProfileDTO;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@AuthenticationPrincipal User userDetails) {
        // @AuthenticationPrincipal automatically injects the currently logged-in user
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        UserProfileDTO userProfile = userService.mapToUserProfileDTO(userDetails);
        return ResponseEntity.ok(userProfile);
    }
}
