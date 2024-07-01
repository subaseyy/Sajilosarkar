package com.sajilosarkar.sajilosarkar.service;

import com.sajilosarkar.sajilosarkar.dto.ScrapeItemDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ScrapeItemService {
    List<ScrapeItemDto> getAllScrapeItems();
}
