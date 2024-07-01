package com.sajilosarkar.sajilosarkar.repository;


import com.sajilosarkar.sajilosarkar.entity.PickupOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickupOrderRepository  extends JpaRepository<PickupOrder, Long > {
}
