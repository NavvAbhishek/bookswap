package com.bookswap.bookswap.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    // This remains the default location, used for profile pictures
    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the default file storage directory.", ex);
        }
    }

    /**
     * Stores a file in the default location (for profile pictures).
     * @param file The file to store.
     * @return The unique filename.
     */
    public String storeFile(MultipartFile file) {
        // Generate a unique file name to avoid collisions
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        try {
            // Resolve the final path within the default storage location
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    /**
     * Stores a file in a specified directory (for book photos).
     * @param file The file to store.
     * @param uploadDir The target directory path (e.g., from application.properties).
     * @return The unique filename.
     */
    public String storeFile(MultipartFile file, String uploadDir) {
        // 1. Create a Path object for the specified upload directory
        Path targetDir = Paths.get(uploadDir).toAbsolutePath().normalize();

        // 2. Ensure the target directory exists
        try {
            Files.createDirectories(targetDir);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory for upload: " + uploadDir, ex);
        }

        // 3. Generate a unique file name
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // 4. Copy the file to the final destination
        try {
            Path targetLocation = targetDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + " in directory " + uploadDir + ". Please try again!", ex);
        }
    }
}