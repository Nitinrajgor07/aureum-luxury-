package com.aureum.backend.service;

import com.aureum.backend.dto.ProductDTOs.FilterOptions;
import com.aureum.backend.model.Product;
import com.aureum.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    // Constructor injection (best practice)
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Advanced filter + sort.
     *
     * @param category category dropdown (null/"All" = sab)
     * @param search   search box (product name mein match)
     * @param minPrice price slider ka lower bound (inclusive)
     * @param maxPrice price slider ka upper bound (inclusive)
     * @param size     size/option filter (e.g. "40R (Regular)")
     * @param sortBy   "price_asc" | "price_desc" | "rating_asc" | "rating_desc"
     */
    public List<Product> getAllProducts(String category, String search, Double minPrice,
                                         Double maxPrice, String size, String sortBy) {

        // Step 1: base list — search ya category se
        List<Product> products;
        if (search != null && !search.isBlank()) {
            products = productRepository.findByNameContainingIgnoreCase(search.trim());
        } else if (category != null && !category.equalsIgnoreCase("All")) {
            products = productRepository.findByCategory(category);
        } else {
            products = productRepository.findAll();
        }

        // Step 2: price range filter
        if (minPrice != null) {
            products = products.stream()
                    .filter(p -> p.getPrice() != null && p.getPrice() >= minPrice)
                    .collect(Collectors.toList());
        }
        if (maxPrice != null) {
            products = products.stream()
                    .filter(p -> p.getPrice() != null && p.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }

        // Step 3: size/option filter (options column = comma-separated string)
        if (size != null && !size.isBlank()) {
            String wanted = size.trim().toLowerCase();
            products = products.stream()
                    .filter(p -> p.getOptions() != null &&
                            Arrays.stream(p.getOptions().split(","))
                                    .map(String::trim)
                                    .anyMatch(opt -> opt.toLowerCase().contains(wanted)))
                    .collect(Collectors.toList());
        }

        // Step 4: sorting
        if (sortBy != null) {
            Comparator<Product> comparator = switch (sortBy.toLowerCase()) {
                case "price_asc" -> Comparator.comparing(Product::getPrice, Comparator.nullsLast(Double::compareTo));
                case "price_desc" -> Comparator.comparing(Product::getPrice, Comparator.nullsLast(Double::compareTo)).reversed();
                case "rating_asc" -> Comparator.comparing(Product::getRating, Comparator.nullsLast(Double::compareTo));
                case "rating_desc" -> Comparator.comparing(Product::getRating, Comparator.nullsLast(Double::compareTo)).reversed();
                default -> null;
            };
            if (comparator != null) {
                products = products.stream().sorted(comparator).collect(Collectors.toList());
            }
        }

        return products;
    }

    /**
     * Filter UI banane ke liye metadata: price slider ka min/max,
     * available categories, aur saare unique sizes/options.
     */
    public FilterOptions getFilterOptions() {
        List<Product> all = productRepository.findAll();

        double min = all.stream()
                .map(Product::getPrice)
                .filter(p -> p != null)
                .min(Double::compareTo)
                .orElse(0.0);

        double max = all.stream()
                .map(Product::getPrice)
                .filter(p -> p != null)
                .max(Double::compareTo)
                .orElse(0.0);

        List<String> categories = all.stream()
                .map(Product::getCategory)
                .filter(c -> c != null && !c.isBlank())
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        List<String> sizes = all.stream()
                .map(Product::getOptions)
                .filter(o -> o != null && !o.isBlank())
                .flatMap(o -> Arrays.stream(o.split(",")))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        return new FilterOptions(min, max, categories, sizes);
    }

    // ID se ek product laao
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // Sirf featured products
    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    // Naya product save karo (admin ke liye)
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Product delete karo
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}

