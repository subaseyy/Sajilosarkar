package com.sajilosarkar.sajilosarkar.service;

import org.springframework.beans.factory.annotation.Autowired;


import com.sajilosarkar.sajilosarkar.entity.OrderItem;
import com.sajilosarkar.sajilosarkar.repository.OrderItemRepository;

import java.util.List;
import java.util.Optional;

public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepository.findById(id);
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public OrderItem updateOrderItem(Long id, OrderItem orderItemDetails) {
        Optional<OrderItem> optionalOrderItem = orderItemRepository.findById(id);
        if (optionalOrderItem.isPresent()) {
            OrderItem orderItem = optionalOrderItem.get();
            orderItem.setPickupOrder(orderItemDetails.getPickupOrder());
            orderItem.setItem(orderItemDetails.getItem());
            orderItem.setQuantity(orderItemDetails.getQuantity());
            orderItem.setPriceAtOrder(orderItemDetails.getPriceAtOrder());
            return orderItemRepository.save(orderItem);
        }
        return null;
    }

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
    
}
