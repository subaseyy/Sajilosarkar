package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.PickupOrderDTO;

import java.util.List;

public interface PickupOrderService {
    List<PickupOrderDTO> getAllPickupOrderItem();

    void savePickupOrder(PickupOrderDTO pickupOrderDTO);

}
