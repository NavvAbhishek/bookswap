package com.bookswap.bookswap.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AddressComponent;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class GeocodingService {

    private final GeoApiContext context;

    // The GeoApiContext is the entry point for making requests to Google Maps APIs.
    // It's created once with the API key and then reused.
    public GeocodingService(@Value("${google.maps.api.key}") String apiKey) {
        this.context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
    }

    /**
     * Performs a reverse geocoding lookup to find a city name from coordinates.
     * @param lat Latitude
     * @param lng Longitude
     * @return The city name (locality) or a default string if not found.
     */
    public String getCityFromCoordinates(double lat, double lng) {
        try {
            // Make the API call to Google
            GeocodingResult[] results = GeocodingApi.reverseGeocode(context, new LatLng(lat, lng)).await();

            if (results != null && results.length > 0) {
                // The first result is usually the most specific one
                GeocodingResult bestResult = results[0];
                // We iterate through the address components to find the "locality" (city)
                for (AddressComponent component : bestResult.addressComponents) {
                    for (AddressComponentType type : component.types) {
                        if (type == AddressComponentType.LOCALITY) {
                            return component.longName;
                        }
                    }
                }
                // If locality is not found, return a formatted address as a fallback
                return bestResult.formattedAddress;
            }
        } catch (ApiException | InterruptedException | IOException e) {
            log.error("Error during reverse geocoding", e);
            Thread.currentThread().interrupt(); // Good practice
        }
        return "Unknown Location"; // Default fallback
    }
}