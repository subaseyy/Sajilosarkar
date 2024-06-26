package com.sajilosarkar.sajilosarkar.service.impl;

import com.sajilosarkar.sajilosarkar.dto.ScrapeItemDto;
import com.sajilosarkar.sajilosarkar.entity.ScrapeItems;
import com.sajilosarkar.sajilosarkar.repository.ScrapeItemsRepository;
import com.sajilosarkar.sajilosarkar.service.ScrapeItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScrapeItemServiceImpl implements ScrapeItemService {

    private final ScrapeItemsRepository scrapeItemsRepository;

    public ScrapeItemServiceImpl(ScrapeItemsRepository scrapeItemsRepository) {
        this.scrapeItemsRepository = scrapeItemsRepository;
    }

    @Override
    public List<ScrapeItemDto> getAllScrapeItems() {
        List<ScrapeItems> scrapeItems = scrapeItemsRepository.findAll();
        return scrapeItems.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ScrapeItemDto convertToDto(ScrapeItems scrapeItems) {
        ScrapeItemDto scrapeItemDto = new ScrapeItemDto();
        scrapeItemDto.setId(scrapeItems.getId());
        scrapeItemDto.setDescription(scrapeItems.getDescription());
        scrapeItemDto.setName(scrapeItems.getName());
        scrapeItemDto.setPrice(scrapeItems.getPrice());
        scrapeItemDto.setCategory(scrapeItems.getCategory());

        return scrapeItemDto;
    }
}
