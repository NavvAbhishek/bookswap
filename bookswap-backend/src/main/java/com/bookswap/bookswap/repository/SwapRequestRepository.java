package com.bookswap.bookswap.repository;


import com.bookswap.bookswap.enums.SwapRequestStatus;
import com.bookswap.bookswap.model.Book;
import com.bookswap.bookswap.model.SwapRequest;
import com.bookswap.bookswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {

    // Find all requests made BY a specific user (their outgoing requests)
    List<SwapRequest> findByRequester(User requester);

    // Find all requests made FOR a specific user's books (their incoming requests)
    List<SwapRequest> findByOwner(User owner);

    // Check if a specific user already has a pending request for a specific book
    Optional<SwapRequest> findByBookAndRequesterAndStatus(Book book, User requester, SwapRequestStatus status);

    // Count pending requests for a specific book
    Long countByBookAndStatus(Book book, SwapRequestStatus status);
}