package com.portfolio.urlshortener.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class ShortenRequest {
    @NotBlank(message = "URL cannot be empty")
    @URL(message = "Invalid URL format")
    private String url;
}
