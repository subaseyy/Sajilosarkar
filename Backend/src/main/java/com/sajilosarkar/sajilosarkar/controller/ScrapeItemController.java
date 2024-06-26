package com.sajilosarkar.sajilosarkar.controller;

import com.sajilosarkar.sajilosarkar.dto.ScrapeItemDto;
import com.sajilosarkar.sajilosarkar.service.ScrapeItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scrapeitems")
@Validated
public class ScrapeItemController {

    private final ScrapeItemService scrapeItemService;

    public ScrapeItemController(ScrapeItemService scrapeItemService) {
        this.scrapeItemService = scrapeItemService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ScrapeItemDto>> getAllScrapeItems() {
        List<ScrapeItemDto> scrapeItems = scrapeItemService.getAllScrapeItems();
        return ResponseEntity.ok(scrapeItems);
    }
}
