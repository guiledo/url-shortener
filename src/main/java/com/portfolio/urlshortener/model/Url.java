package com.portfolio.urlshortener.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"Url\"", indexes = {
    @Index(name = "Url_originalUrl_idx", columnList = "\"originalUrl\""),
    @Index(name = "Url_shortCode_idx", columnList = "\"shortCode\"")
})
@Data
@NoArgsConstructor
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "\"originalUrl\"")
    private String originalUrl;

    @Column(unique = true, name = "\"shortCode\"")
    private String shortCode;

    @Column(nullable = false, name = "\"createdAt\"")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Integer clicks = 0;
}
