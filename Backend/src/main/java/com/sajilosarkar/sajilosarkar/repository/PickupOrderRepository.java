package com.sajilosarkar.sajilosarkar.repository;


import com.sajilosarkar.sajilosarkar.entity.PickupOrder;
import com.sajilosarkar.sajilosarkar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupOrderRepository  extends JpaRepository<PickupOrder, Long > {
    List<PickupOrder> findByCustomer(User customer);
}
