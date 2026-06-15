package com.aureum.backend.controller;

import com.aureum.backend.dto.ProductDTOs.FilterOptions;
import com.aureum.backend.model.Product;
import com.aureum.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // React frontend allow karo
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET /api/products — saare products
    // Query params (sab optional, jaisi zaroorat ho combine karo):
    //   ?category=Suits
    //   ?search=tuxedo
    //   ?minPrice=500&maxPrice=5000
    //   ?size=40R (Regular)
    //   ?sortBy=price_asc | price_desc | rating_asc | rating_desc
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String sortBy) {
        List<Product> products = productService.getAllProducts(category, search, minPrice, maxPrice, size, sortBy);
        return ResponseEntity.ok(products);
    }

    // GET /api/products/filters — price range slider + category/size lists ke liye
    @GetMapping("/filters")
    public ResponseEntity<FilterOptions> getFilterOptions() {
        return ResponseEntity.ok(productService.getFilterOptions());
    }

    // GET /api/products/featured — sirf featured products
    @GetMapping("/featured")
    public ResponseEntity<List<Product>> getFeaturedProducts() {
        List<Product> products = productService.getFeaturedProducts();
        return ResponseEntity.ok(products);
    }

    // GET /api/products/{id} — ek specific product
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productService.getProductById(id);
        return product
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/products — naya product add karo
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    // DELETE /api/products/{id} — product delete karo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

