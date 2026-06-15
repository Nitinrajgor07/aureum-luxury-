package com.aureum.backend.repository;

import com.aureum.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    // Category ke hisaab se filter karo
    List<Product> findByCategory(String category);

    // Sirf featured products laao
    List<Product> findByFeaturedTrue();

    // Category + featured dono se filter
    List<Product> findByCategoryAndFeaturedTrue(String category);

    // Naam mein search term dhundo (case-insensitive) — search box ke liye
    List<Product> findByNameContainingIgnoreCase(String name);
}
