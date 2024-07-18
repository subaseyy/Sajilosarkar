package com.sajilosarkar.sajilosarkar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "scrape_items")
public class ScrapeItems {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String price;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @ManyToMany(mappedBy = "scrapeItems")
    private List<PickupOrder> pickupOrders;
    
}
