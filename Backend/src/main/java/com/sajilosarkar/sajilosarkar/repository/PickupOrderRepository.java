package com.sajilosarkar.sajilosarkar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sajilosarkar.sajilosarkar.entity.PickupOrder;

public interface PickupOrderRepository extends JpaRepository<PickupOrder, Long>{
    
}
