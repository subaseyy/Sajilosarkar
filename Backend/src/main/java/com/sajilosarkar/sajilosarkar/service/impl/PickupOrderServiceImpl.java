package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.PickupOrderDTO;
import com.sajilosarkar.sajilosarkar.dto.ScrapeItemDto;
import com.sajilosarkar.sajilosarkar.entity.PickupOrder;
import com.sajilosarkar.sajilosarkar.entity.ScrapeItems;
import com.sajilosarkar.sajilosarkar.entity.User;
import com.sajilosarkar.sajilosarkar.repository.PickupOrderRepository;
import com.sajilosarkar.sajilosarkar.repository.ScrapeItemsRepository;
import com.sajilosarkar.sajilosarkar.repository.UserRepository;
import com.sajilosarkar.sajilosarkar.service.PickupOrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PickupOrderServiceImpl implements PickupOrderService {

    private final PickupOrderRepository pickupOrderRepository;
    private final UserRepository userRepository;
    private final ScrapeItemsRepository scrapeItemsRepository;

    public PickupOrderServiceImpl(PickupOrderRepository pickupOrderRepository, UserRepository userRepository, ScrapeItemsRepository scrapeItemsRepository) {
        this.pickupOrderRepository = pickupOrderRepository;
        this.userRepository = userRepository;
        this.scrapeItemsRepository = scrapeItemsRepository;
    }

    @Override
    public List<PickupOrderDTO> getAllPickupOrderItem() {
        List<PickupOrder> pickupOrderItems = pickupOrderRepository.findAll();
        return pickupOrderItems.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePickupOrderById(int id) {
        if (pickupOrderRepository.existsById((long) id)) {
            pickupOrderRepository.deleteById((long) id);
        } else {
            throw new RuntimeException("Order not found with id: " + id);
        }
    }

    private PickupOrderDTO convertToDto(PickupOrder pickupOrder) {
        PickupOrderDTO pickupOrderDTO = new PickupOrderDTO();
        pickupOrderDTO.setOrderId(pickupOrder.getOrderId());  // Ensure this is mapped
        pickupOrderDTO.setOrderId(pickupOrder.getOrderId());
        pickupOrderDTO.setOrderDate(pickupOrder.getOrderDate());
        pickupOrderDTO.setPickupTime(pickupOrder.getPickupTime());
        pickupOrderDTO.setTotalPrice(pickupOrder.getTotalPrice());
        pickupOrderDTO.setScrapeItems(pickupOrder.getScrapeItems().stream()
                .map(scrapeItem -> new ScrapeItemDto(scrapeItem.getId(), scrapeItem.getName(), scrapeItem.getPrice()))
                .collect(Collectors.toList()));
        pickupOrderDTO.setCustomerId(pickupOrder.getCustomer().getId());
        return pickupOrderDTO;
    }

    @Override
    @Transactional
    public void savePickupOrder(PickupOrderDTO pickupOrderDTO) {
        PickupOrder pickupOrder = new PickupOrder();
        pickupOrder.setOrderId(pickupOrderDTO.getOrderId());  // Ensure this is set if updating
        pickupOrder.setOrderId(pickupOrderDTO.getOrderId());
        pickupOrder.setOrderDate(pickupOrderDTO.getOrderDate());
        pickupOrder.setPickupTime(pickupOrderDTO.getPickupTime());
        pickupOrder.setTotalPrice(pickupOrderDTO.getTotalPrice());

        User customer = userRepository.findById(pickupOrderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        pickupOrder.setCustomer(customer);

        List<ScrapeItems> scrapeItems = pickupOrderDTO.getScrapeItems().stream()
                .map(dto -> scrapeItemsRepository.findById(dto.getId())
                        .orElseThrow(() -> new RuntimeException("Scrape item not found")))
                .collect(Collectors.toList());
        pickupOrder.setScrapeItems(scrapeItems);

        pickupOrderRepository.save(pickupOrder);
    }

    @Override
    public List<PickupOrderDTO> findPickupOrderByUserId(Integer userId) {
        User customer = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<PickupOrder> pickupOrders = pickupOrderRepository.findByCustomer(customer);
        return pickupOrders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
