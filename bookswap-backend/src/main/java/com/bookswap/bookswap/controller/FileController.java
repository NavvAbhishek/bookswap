package com.bookswap.bookswap.controller;

import com.bookswap.bookswap.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @Value("${book.photo.upload-dir}")
    private String bookPhotoUploadDir;

    @PostMapping("/upload/book-photo")
    public ResponseEntity<?> uploadBookPhoto(@RequestParam("photo") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file, bookPhotoUploadDir);
        return ResponseEntity.ok(Map.of("filename", fileName));
    }
}