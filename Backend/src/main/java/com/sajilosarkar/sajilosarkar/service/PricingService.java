package com.sajilosarkar.sajilosarkar.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sajilosarkar.sajilosarkar.entity.Pricing;
import com.sajilosarkar.sajilosarkar.dto.PricingDTO;
import com.sajilosarkar.sajilosarkar.repository.PricingRepository;
import com.sajilosarkar.sajilosarkar.repository.ScrapeItemsRepository;

@Service
public class PricingService {

    @Autowired
    private PricingRepository pricingRepository;

    @Autowired
    private ScrapeItemsRepository scrapeItemsRepository;

    public List<PricingDTO> getAllPricing() {
        List<Pricing> pricingList = pricingRepository.findAll();
        return pricingList.stream()
                          .map(this::convertToDTO)
                          .collect(Collectors.toList());
    }

    public PricingDTO getPricingDTOById(Long id) {
        Optional<Pricing> optionalPricing = pricingRepository.findById(id);
        return optionalPricing.map(this::convertToDTO).orElse(null);
    }

    public PricingDTO createPricing(PricingDTO pricingDTO) {
        Pricing pricing = convertToEntity(pricingDTO);
        Pricing savedPricing = pricingRepository.save(pricing);
        return convertToDTO(savedPricing);
    }

    public PricingDTO updatePricing(Long id, PricingDTO pricingDetails) {
        Optional<Pricing> optionalPricing = pricingRepository.findById(id);
        if (optionalPricing.isPresent()) {
            Pricing pricing = optionalPricing.get();
            pricing.setItem(scrapeItemsRepository.findById(pricingDetails.getItemId()).orElse(null));
            pricing.setPrice(pricingDetails.getPrice());
            pricing.setDiscount(pricingDetails.getDiscount());
            pricing.setStartDate(pricingDetails.getStartDate());
            pricing.setEndDate(pricingDetails.getEndDate());
            Pricing updatedPricing = pricingRepository.save(pricing);
            return convertToDTO(updatedPricing);
        }
        return null;
    }

    public void deletePricing(Long id) {
        pricingRepository.deleteById(id);
    }

    private PricingDTO convertToDTO(Pricing pricing) {
        PricingDTO dto = new PricingDTO();
        dto.setPricingId(pricing.getPricingId());
        dto.setItemId(pricing.getItem().getId());
        dto.setPrice(pricing.getPrice());
        dto.setDiscount(pricing.getDiscount());
        dto.setStartDate(pricing.getStartDate());
        dto.setEndDate(pricing.getEndDate());
        return dto;
    }

    private Pricing convertToEntity(PricingDTO pricingDTO) {
        Pricing pricing = new Pricing();
        pricing.setItem(scrapeItemsRepository.findById(pricingDTO.getItemId()).orElse(null));
        pricing.setPrice(pricingDTO.getPrice());
        pricing.setDiscount(pricingDTO.getDiscount());
        pricing.setStartDate(pricingDTO.getStartDate());
        pricing.setEndDate(pricingDTO.getEndDate());
        return pricing;
    }
}
