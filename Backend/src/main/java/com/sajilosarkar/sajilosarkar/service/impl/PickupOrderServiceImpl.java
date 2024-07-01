package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.PickupOrderDTO;
import com.sajilosarkar.sajilosarkar.dto.ScrapeItemDto;
import com.sajilosarkar.sajilosarkar.entity.PickupOrder;
import com.sajilosarkar.sajilosarkar.repository.PickupOrderRepository;
import com.sajilosarkar.sajilosarkar.service.PickupOrderService;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PickupOrderServiceImpl implements PickupOrderService {

    private final PickupOrderRepository pickupOrderRepository;

    public PickupOrderServiceImpl(PickupOrderRepository pickupOrderRepository) {
        this.pickupOrderRepository = pickupOrderRepository;
    }

    @Override
    public List<PickupOrderDTO> getAllPickupOrderItem() {
        List<PickupOrder> pickupOrderItems = pickupOrderRepository.findAll();
        return pickupOrderItems.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private PickupOrderDTO convertToDto(PickupOrder pickupOrder) {
        PickupOrderDTO pickupOrderDTO = new PickupOrderDTO();
        pickupOrderDTO.setOrderId(pickupOrder.getOrderId());
        pickupOrderDTO.setOrderDate((Date) pickupOrder.getOrderDate());
        pickupOrderDTO.setPickupTime((Date) pickupOrder.getPickupTime());
        pickupOrderDTO.setTotalPrice(pickupOrder.getTotalPrice());
        pickupOrderDTO.setScrapeItem(pickupOrder.getScrapeItem());
        pickupOrderDTO.setCustomerId(Long.valueOf(pickupOrder.getCustomer().getId()));
        return pickupOrderDTO;
    }
}
