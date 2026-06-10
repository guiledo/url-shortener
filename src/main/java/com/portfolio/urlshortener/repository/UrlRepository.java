package com.portfolio.urlshortener.repository;

import com.portfolio.urlshortener.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Integer> {
    Optional<Url> findByOriginalUrl(String originalUrl);
    Optional<Url> findByShortCode(String shortCode);
    
    @Modifying
    @Query("UPDATE Url u SET u.clicks = u.clicks + 1 WHERE u.shortCode = :shortCode")
    void incrementClicks(String shortCode);
}
