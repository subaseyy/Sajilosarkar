package com.sajilosarkar.sajilosarkar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sajilosarkar.sajilosarkar.dto.PricingDTO;
import com.sajilosarkar.sajilosarkar.service.PricingService;

import java.util.List;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {

    @Autowired
    private PricingService pricingService;

    @GetMapping
    public List<PricingDTO> getAllPricing() {
        return pricingService.getAllPricing();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PricingDTO> getPricingById(@PathVariable Long id) {
        PricingDTO pricingDTO = pricingService.getPricingDTOById(id);
        return ResponseEntity.ok(pricingDTO);
    }

    @PostMapping
    public ResponseEntity<PricingDTO> createPricing(@RequestBody PricingDTO pricingDTO) {
        PricingDTO createdPricing = pricingService.createPricing(pricingDTO);
        return ResponseEntity.ok(createdPricing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PricingDTO> updatePricing(@PathVariable Long id, @RequestBody PricingDTO pricingDetails) {
        PricingDTO updatedPricing = pricingService.updatePricing(id, pricingDetails);
        return ResponseEntity.ok(updatedPricing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePricing(@PathVariable Long id) {
        pricingService.deletePricing(id);
        return ResponseEntity.noContent().build();
    }
}
