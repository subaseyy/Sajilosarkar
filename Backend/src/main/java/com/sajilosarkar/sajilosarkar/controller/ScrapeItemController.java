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

    @PostMapping("/pickup")
    public ResponseEntity<?> createPickupOrder(@RequestBody PickupOrderDTO pickupOrderDTO) {
        try {
            pickupOrderService.savePickupOrder(pickupOrderDTO);
            return ResponseEntity.ok("Pickup order added successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to add pickup order");
        }
    }

            
            
    @GetMapping("{userid}/order")
    public ResponseEntity<List<PickupOrderDTO>> getPickupOrderbyUser(@PathVariable Integer userid) {
        List<PickupOrderDTO> pickupOrder = pickupOrderService.findPickupOrderByUserId(userid);
        return ResponseEntity.ok(pickupOrder);

    }

    @GetMapping("{userid}/order/{id}")
    public ResponseEntity<List<PickupOrderDTO>> getPickupOrderbyUser(@PathVariable Integer userid, @PathVariable Integer id){
        List<PickupOrderDTO> pickupOrder = pickupOrderService.findPickupOrderByUserId(userid);
        return ResponseEntity.ok(pickupOrder);
    }

    @DeleteMapping("{userid}/order/{id}")
    public ResponseEntity<?> deletePickupOrder(@PathVariable Integer userid, @PathVariable Integer id) {
        try {
            pickupOrderService.deletePickupOrderById(id); // Ensure this method is implemented in your service
            return ResponseEntity.ok("Order deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete order");
        }
    }

    @GetMapping("/pickup")
    public ResponseEntity<List<PickupOrderDTO>> getPickupOrders() {
        List<PickupOrderDTO> pickupOrderItems = pickupOrderService.getAllPickupOrderItem();
        return ResponseEntity.ok(pickupOrderItems);
    }
}
