package com.aureum.backend.dto;

import java.util.List;

public class OrderDTOs {

    /** CartDrawer ke "Place order" form se aane wala data. */
    public static class PlaceOrderRequest {
        private String address;
        private String city;
        private List<OrderItemRequest> items;

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public List<OrderItemRequest> getItems() { return items; }
        public void setItems(List<OrderItemRequest> items) { this.items = items; }
    }

    /** Cart ka ek item — frontend ke CartItem se match karta hai. */
    public static class OrderItemRequest {
        private String productId;
        private String productName;
        private String selectedOption;
        private Integer quantity;
        private Double price;

        public String getProductId() { return productId; }
        public void setProductId(String productId) { this.productId = productId; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public String getSelectedOption() { return selectedOption; }
        public void setSelectedOption(String selectedOption) { this.selectedOption = selectedOption; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }

        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }

    /** Admin panel se order status badalne ke liye. body: { "status": "SHIPPED" } */
    public static class StatusUpdateRequest {
        private String status;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    /** Simple error message wrapper, AuthDTOs.ErrorResponse jaisa. */
    public static class ErrorResponse {
        private String message;
        public ErrorResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }
}
