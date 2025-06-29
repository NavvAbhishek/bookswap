package com.bookswap.bookswap.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private String name;
    private String email;
    private Double latitude;
    private Double longitude;
    private String locationName;
    private String profilePictureUrl;
}
