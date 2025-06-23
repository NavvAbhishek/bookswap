package com.bookswap.bookswap.repository;

import com.bookswap.bookswap.model.Book;
import com.bookswap.bookswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Finds all books owned by a specific user
    List<Book> findByOwnerOrderByIdDesc(User owner);
}
