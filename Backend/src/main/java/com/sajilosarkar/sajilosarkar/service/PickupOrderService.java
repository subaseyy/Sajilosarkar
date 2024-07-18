package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.PickupOrderDTO;

import java.util.List;

public interface PickupOrderService {
    List<PickupOrderDTO> getAllPickupOrderItem();

//    List<PickupOrderDTO> findByUser(User customer);

    void savePickupOrder(PickupOrderDTO pickupOrderDTO);

    List<PickupOrderDTO> findPickupOrderByUserId(Integer userId);

}
