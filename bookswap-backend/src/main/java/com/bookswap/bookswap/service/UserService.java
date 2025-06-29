package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.UserProfileDTO;
import com.bookswap.bookswap.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final GeocodingService geocodingService;

    public UserProfileDTO mapToUserProfileDTO(User user) {
        // Construct the full URL for the profile picture
        String profilePicUrl = user.getProfilePictureUrl() != null
                ? "http://localhost:8080/uploads/profile-pics/" + user.getProfilePictureUrl()
                : null;

        String locationName = "Location not set";
        if (user.getLatitude() != null && user.getLongitude() != null) {
            locationName = geocodingService.getCityFromCoordinates(user.getLatitude(), user.getLongitude());
        }

        return UserProfileDTO.builder()
                .name(user.getName())
                .email(user.getEmail())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .locationName(locationName)
                .profilePictureUrl(profilePicUrl)
                .build();
    }
}