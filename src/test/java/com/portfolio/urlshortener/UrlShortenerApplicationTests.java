package com.portfolio.urlshortener;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:postgresql://localhost:5432/url_shortener",
    "spring.datasource.username=user",
    "spring.datasource.password=password",
    "spring.jpa.hibernate.ddl-auto=none"
})
class UrlShortenerApplicationTests {

    @Test
    void contextLoads() {
    }

}
