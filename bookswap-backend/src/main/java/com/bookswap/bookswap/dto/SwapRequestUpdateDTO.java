package com.bookswap.bookswap.dto;

import com.bookswap.bookswap.enums.SwapRequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SwapRequestUpdateDTO {
    @NotNull
    private SwapRequestStatus status;
}