package com.portfolio.urlshortener.service;

import com.portfolio.urlshortener.model.Url;
import com.portfolio.urlshortener.repository.UrlRepository;
import com.portfolio.urlshortener.util.Base62;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UrlService {
    
    private final UrlRepository urlRepository;

    @Transactional
    public String shorten(String originalUrl) {
        Optional<Url> existing = urlRepository.findByOriginalUrl(originalUrl);
        if (existing.isPresent() && existing.get().getShortCode() != null) {
            return existing.get().getShortCode();
        }

        String shortCode = null;
        boolean isUnique = false;
        int attempts = 0;

        do {
            shortCode = Base62.generateRandomCode(7);
            if (urlRepository.findByShortCode(shortCode).isEmpty()) {
                isUnique = true;
            }
            attempts++;
        } while (!isUnique && attempts < 10);

        if (!isUnique) {
            throw new RuntimeException("Failed to generate a unique short code");
        }

        Url newUrl = new Url();
        newUrl.setOriginalUrl(originalUrl);
        newUrl.setShortCode(shortCode);
        
        urlRepository.save(newUrl);
        return shortCode;
    }

    public Optional<String> getOriginalUrl(String shortCode) {
        return urlRepository.findByShortCode(shortCode)
                .map(Url::getOriginalUrl);
    }

    @Transactional
    public void trackClick(String shortCode) {
        urlRepository.incrementClicks(shortCode);
    }

    public Optional<Integer> getStats(String shortCode) {
        return urlRepository.findByShortCode(shortCode)
                .map(Url::getClicks);
    }
}
