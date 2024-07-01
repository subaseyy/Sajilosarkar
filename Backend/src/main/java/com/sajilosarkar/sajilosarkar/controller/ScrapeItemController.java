package com.sajilosarkar.sajilosarkar.controller;

import com.sajilosarkar.sajilosarkar.dto.PickupOrderDTO;
import com.sajilosarkar.sajilosarkar.dto.ScrapeItemDto;
import com.sajilosarkar.sajilosarkar.service.PickupOrderService;
import com.sajilosarkar.sajilosarkar.service.ScrapeItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scrapeitems")
@RequiredArgsConstructor
public class ScrapeItemController {

    private final ScrapeItemService scrapeItemService;
    private final PickupOrderService pickupOrderService;


    @GetMapping("/all")
    public ResponseEntity<List<ScrapeItemDto>> getAllScrapeItems() {
        List<ScrapeItemDto> scrapeItems = scrapeItemService.getAllScrapeItems();
        return ResponseEntity.ok(scrapeItems);
    }

//    @PostMapping("/pickup")


    @GetMapping("/pickup")
    public ResponseEntity<List<PickupOrderDTO>> getPickupOrders() {
        List<PickupOrderDTO> pickupOrderItems = pickupOrderService.getAllPickupOrderItem();
        return ResponseEntity.ok(pickupOrderItems);
    }
}
