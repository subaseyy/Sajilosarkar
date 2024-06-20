package com.sajilosarkar.sajilosarkar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sajilosarkar.sajilosarkar.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
