package com.aureum.backend.controller;

import com.aureum.backend.dto.OrderDTOs.PlaceOrderRequest;
import com.aureum.backend.dto.OrderDTOs.StatusUpdateRequest;
import com.aureum.backend.model.Order;
import com.aureum.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Saare endpoints JWT-protected hain (SecurityConfig mein "/api/**" -> anyRequest().authenticated()
 * ke andar aate hain, sirf /api/auth/** aur GET /api/products/** public hain).
 * Isliye frontend ko Authorization: Bearer &lt;token&gt; header bhejna zaroori hai.
 *
 * GET    /api/orders/my          -> apni order history
 * POST   /api/orders             -> naya order place karo (cart checkout)
 * GET    /api/orders/{id}        -> order detail (owner ya admin)
 * GET    /api/orders             -> admin: saari orders
 * PUT    /api/orders/{id}/status -> admin: order status update karo
 */
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "https://aureum-luxury.vercel.app"})
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(Authentication auth, @RequestBody PlaceOrderRequest request) {
        Order order = orderService.placeOrder(auth.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(Authentication auth) {
        return ResponseEntity.ok(orderService.getMyOrders(auth.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(Authentication auth, @PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(auth.getName(), id));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(Authentication auth) {
        return ResponseEntity.ok(orderService.getAllOrders(auth.getName()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(Authentication auth, @PathVariable Long id,
                                               @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(auth.getName(), id, request.getStatus()));
    }
}
