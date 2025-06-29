package com.bookswap.bookswap.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String name;
    private String email;
    private String password;
    private Double latitude;
    private Double longitude;
}
