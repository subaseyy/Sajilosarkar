package com.sajilosarkar.sajilosarkar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sajilosarkar.sajilosarkar.entity.PickupOrder;
import com.sajilosarkar.sajilosarkar.repository.PickupOrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PickupOrderService {
    

    @Autowired
    private PickupOrderRepository pickupOrderRepository;

    public List<PickupOrder> getAllPickupOrders() {
        return pickupOrderRepository.findAll();
    }

    public Optional<PickupOrder> getPickupOrderById(Long id) {
        return pickupOrderRepository.findById(id);
    }

    public PickupOrder createPickupOrder(PickupOrder pickupOrder) {
        return pickupOrderRepository.save(pickupOrder);
    }

    public PickupOrder updatePickupOrder(Long id, PickupOrder pickupOrderDetails) {
        Optional<PickupOrder> optionalPickupOrder = pickupOrderRepository.findById(id);
        if (optionalPickupOrder.isPresent()) {
            PickupOrder pickupOrder = optionalPickupOrder.get();
            pickupOrder.setCustomer(pickupOrderDetails.getCustomer());
            pickupOrder.setOrderDate(pickupOrderDetails.getOrderDate());
            pickupOrder.setPickupTime(pickupOrderDetails.getPickupTime());
            pickupOrder.setTotalPrice(pickupOrderDetails.getTotalPrice());
            return pickupOrderRepository.save(pickupOrder);
        }
        return null;
    }

    public void deletePickupOrder(Long id) {
        pickupOrderRepository.deleteById(id);
    }
}

