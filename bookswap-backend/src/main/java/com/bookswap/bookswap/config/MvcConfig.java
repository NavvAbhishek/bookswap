package com.bookswap.bookswap.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${book.photo.upload-dir}")
    private String bookPhotoUploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Handler for profile pictures
        String resourcePath = Paths.get(uploadDir).toAbsolutePath().toString();
        registry.addResourceHandler("/uploads/profile-pics/**")
                .addResourceLocations("file:/" + resourcePath + "/");

        // Handler for book photos
        String bookPhotoResourcePath = Paths.get(bookPhotoUploadDir).toAbsolutePath().toString();
        registry.addResourceHandler("/uploads/book-pics/**")
                .addResourceLocations("file:/" + bookPhotoResourcePath + "/");
    }
}
