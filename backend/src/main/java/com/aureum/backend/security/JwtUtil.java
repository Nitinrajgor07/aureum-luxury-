package com.aureum.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // application.properties mein set karo: aureum.jwt.secret=<min-32-char-secret>
    @Value("${aureum.jwt.secret:aureum-luxury-secret-key-very-long-2024}")
    private String jwtSecret;

    @Value("${aureum.jwt.expiration:86400000}") // 24 hours default
    private long jwtExpiration;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Token generate karo
    public String generateToken(String email, Long userId, String role) {
        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getKey())
                .compact();
    }

    // Token se email nikalo
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Token valid hai?
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
