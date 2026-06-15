package com.aureum.backend.service;

import com.aureum.backend.dto.OrderDTOs.OrderItemRequest;
import com.aureum.backend.dto.OrderDTOs.PlaceOrderRequest;
import com.aureum.backend.model.Order;
import com.aureum.backend.model.OrderItem;
import com.aureum.backend.model.OrderStatus;
import com.aureum.backend.model.User;
import com.aureum.backend.repository.OrderRepository;
import com.aureum.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    // JWT se mile email se User entity nikalo
    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User nahi mila"));
    }

    /**
     * CartDrawer ke checkout step ka backend version:
     * cart ke items + address/city leke ek Order row + uske OrderItems banata hai.
     */
    public Order placeOrder(String email, PlaceOrderRequest request) {
        User user = getUserByEmail(email);

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart khali hai, order place nahi ho sakta");
        }
        if (request.getAddress() == null || request.getAddress().isBlank()
                || request.getCity() == null || request.getCity().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Address aur city dono zaroori hain");
        }

        Order order = new Order();
        order.setUserId(user.getId());
        order.setCustomerName(user.getName());
        order.setEmail(user.getEmail());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setStatus(OrderStatus.CONFIRMED);
        order.setCreatedAt(LocalDateTime.now());

        double total = 0;
        for (OrderItemRequest itemReq : request.getItems()) {
            OrderItem item = new OrderItem();
            item.setProductId(itemReq.getProductId());
            item.setProductName(itemReq.getProductName());
            item.setSelectedOption(itemReq.getSelectedOption());
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(itemReq.getPrice());
            order.addItem(item);

            total += itemReq.getPrice() * itemReq.getQuantity();
        }
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    /** Logged-in user ki apni order history — "My Orders" page ke liye. */
    public List<Order> getMyOrders(String email) {
        User user = getUserByEmail(email);
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    /** Ek order ka detail — sirf owner ya admin dekh sakta hai. */
    public Order getOrderById(String email, Long orderId) {
        User user = getUserByEmail(email);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order nahi mila"));

        boolean isOwner = order.getUserId().equals(user.getId());
        boolean isAdmin = user.getRole() == User.Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Ye order tumhara nahi hai");
        }
        return order;
    }

    /** Admin: saari orders, newest pehle — admin panel ki order list. */
    public List<Order> getAllOrders(String email) {
        requireAdmin(email);
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    /** Admin: order ka status change karo (PENDING -> CONFIRMED -> SHIPPED -> ...). */
    public Order updateOrderStatus(String email, Long orderId, String statusValue) {
        requireAdmin(email);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order nahi mila"));

        OrderStatus newStatus;
        try {
            newStatus = OrderStatus.valueOf(statusValue.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Status invalid hai. Allowed: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED");
        }

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    private void requireAdmin(String email) {
        User user = getUserByEmail(email);
        if (user.getRole() != User.Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Sirf admin ye action kar sakta hai");
        }
    }
}
