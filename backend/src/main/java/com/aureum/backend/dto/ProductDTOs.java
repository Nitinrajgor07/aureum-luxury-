package com.aureum.backend.dto;

import java.util.List;

public class ProductDTOs {

    /**
     * Gallery ke filter UI ko populate karne ke liye:
     * price slider ka min/max, category dropdown, aur size/option list.
     * GET /api/products/filters se aata hai.
     */
    public static class FilterOptions {
        private Double minPrice;
        private Double maxPrice;
        private List<String> categories;
        private List<String> sizes;

        public FilterOptions(Double minPrice, Double maxPrice, List<String> categories, List<String> sizes) {
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;
            this.categories = categories;
            this.sizes = sizes;
        }

        public Double getMinPrice() { return minPrice; }
        public Double getMaxPrice() { return maxPrice; }
        public List<String> getCategories() { return categories; }
        public List<String> getSizes() { return sizes; }
    }
}
