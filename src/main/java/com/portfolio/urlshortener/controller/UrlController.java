package com.portfolio.urlshortener.controller;

import com.portfolio.urlshortener.dto.ShortenRequest;
import com.portfolio.urlshortener.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UrlController {

    private final UrlService urlService;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @GetMapping("/")
    public Map<String, String> root() {
        return Map.of("message", "URL Shortener API is running");
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "database", "online");
    }

    @PostMapping("/api/shorten")
    public ResponseEntity<Map<String, String>> shorten(@Valid @RequestBody ShortenRequest request, HttpServletRequest httpRequest) {
        String shortCode = urlService.shorten(request.getUrl());
        
        String protocol = httpRequest.getHeader("X-Forwarded-Proto");
        if (protocol == null) {
            protocol = httpRequest.getScheme();
        }
        String host = httpRequest.getHeader("Host");
        if (host == null) {
            host = httpRequest.getServerName() + ":" + httpRequest.getServerPort();
        }

        String shortUrl = protocol + "://" + host + "/" + shortCode;

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "shortCode", shortCode,
                "shortUrl", shortUrl
        ));
    }

    @GetMapping("/api/analytics/{code}")
    public ResponseEntity<?> getStats(@PathVariable String code) {
        Optional<Integer> clicks = urlService.getStats(code);
        if (clicks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "URL not found"));
        }
        return ResponseEntity.ok(Map.of("clicks", clicks.get()));
    }

    @GetMapping("/{code}")
    public RedirectView redirect(@PathVariable String code) {
        Optional<String> originalUrl = urlService.getOriginalUrl(code);

        if (originalUrl.isEmpty()) {
            return new RedirectView(frontendUrl);
        }

        urlService.trackClick(code);
        return new RedirectView(originalUrl.get());
    }
}
