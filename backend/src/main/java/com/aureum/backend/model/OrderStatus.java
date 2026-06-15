package com.aureum.backend.model;

/**
 * Order ki lifecycle ke stages.
 * Admin panel se PENDING -> CONFIRMED -> SHIPPED -> DELIVERED move karega.
 * CANCELLED kabhi bhi set ho sakta hai.
 */
public enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
