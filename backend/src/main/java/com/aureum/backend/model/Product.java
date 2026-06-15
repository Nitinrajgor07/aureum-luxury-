package com.aureum.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @Column(name = "id", length = 20)
    private String id;

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "image", length = 500)
    private String image;

    @Column(name = "category")
    private String category;

    @Column(name = "sub_category")
    private String subCategory;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "featured")
    private Boolean featured = false;

    @Column(name = "options_label")
    private String optionsLabel;

    // Options comma-separated store honge (e.g. "38R,40R,42R")
    @Column(name = "options", columnDefinition = "TEXT")
    private String options;

    @Column(name = "full_description", columnDefinition = "TEXT")
    private String fullDescription;

    // Constructors
    public Product() {}

    public Product(String id, String name, String description, Double price,
                   String image, String category, String subCategory,
                   Double rating, Boolean featured, String optionsLabel,
                   String options, String fullDescription) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.subCategory = subCategory;
        this.rating = rating;
        this.featured = featured;
        this.optionsLabel = optionsLabel;
        this.options = options;
        this.fullDescription = fullDescription;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public String getOptionsLabel() { return optionsLabel; }
    public void setOptionsLabel(String optionsLabel) { this.optionsLabel = optionsLabel; }

    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
}
