package com.sajilosarkar.sajilosarkar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sajilosarkar.sajilosarkar.entity.ScrapeItems;

public interface ScrapeItemsRepository extends JpaRepository<ScrapeItems, Integer> {
}
