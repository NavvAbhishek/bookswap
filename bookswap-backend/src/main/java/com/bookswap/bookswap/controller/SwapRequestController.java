package com.bookswap.bookswap.controller;

import com.bookswap.bookswap.dto.SwapRequestResponseDTO;
import com.bookswap.bookswap.dto.SwapRequestUpdateDTO;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.service.SwapRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/swap-requests")
@RequiredArgsConstructor
public class SwapRequestController {

    private final SwapRequestService swapRequestService;

    // Endpoint for a user to request a book
    @PostMapping("/book/{bookId}")
    public ResponseEntity<SwapRequestResponseDTO> createSwapRequest(
            @PathVariable Long bookId,
            @AuthenticationPrincipal User currentUser) {
        SwapRequestResponseDTO response = swapRequestService.createSwapRequest(bookId, currentUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Endpoint for a book owner to accept or decline a request
    @PutMapping("/{requestId}")
    public ResponseEntity<SwapRequestResponseDTO> updateSwapRequestStatus(
            @PathVariable Long requestId,
            @Valid @RequestBody SwapRequestUpdateDTO updateDTO,
            @AuthenticationPrincipal User currentUser) {
        SwapRequestResponseDTO response = swapRequestService.updateSwapRequestStatus(requestId, updateDTO.getStatus(), currentUser);
        return ResponseEntity.ok(response);
    }

    // Endpoint to get all requests YOU have made
    @GetMapping("/outgoing")
    public ResponseEntity<List<SwapRequestResponseDTO>> getMyOutgoingRequests(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(swapRequestService.getOutgoingRequests(currentUser));
    }

    // Endpoint to get all requests for YOUR books
    @GetMapping("/incoming")
    public ResponseEntity<List<SwapRequestResponseDTO>> getMyIncomingRequests(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(swapRequestService.getIncomingRequests(currentUser));
    }
}