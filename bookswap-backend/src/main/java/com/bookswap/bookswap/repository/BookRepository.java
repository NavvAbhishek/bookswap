package com.bookswap.bookswap.repository;

import com.bookswap.bookswap.enums.BookStatus;
import com.bookswap.bookswap.model.Book;
import com.bookswap.bookswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Finds all books owned by a specific user
    List<Book> findByOwnerOrderByIdDesc(User owner);

    // "Find all books where the Owner is not the given user AND the Status is the given status,
    // and order them by their creation date in descending order."
    List<Book> findAllByOwnerNotAndStatusOrderByCreatedAtDesc(User owner, BookStatus status);

}