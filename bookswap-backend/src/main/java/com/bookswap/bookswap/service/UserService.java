package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.UserProfileDTO;
import com.bookswap.bookswap.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public UserProfileDTO mapToUserProfileDTO(com.bookswap.bookswap.model.User user) {
        // Construct the full URL for the profile picture
        String profilePicUrl = user.getProfilePictureUrl() != null
                ? "http://localhost:8080/uploads/profile-pics/" + user.getProfilePictureUrl()
                : null;

        return UserProfileDTO.builder()
                .name(user.getName())
                .email(user.getEmail())
                .location(user.getLocation())
                .profilePictureUrl(profilePicUrl)
                .build();
    }
}