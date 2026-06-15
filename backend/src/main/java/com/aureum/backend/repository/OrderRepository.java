package com.aureum.backend.repository;

import com.aureum.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Logged-in user ki order history (newest pehle)
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Admin: saari orders, newest pehle
    List<Order> findAllByOrderByCreatedAtDesc();
}
