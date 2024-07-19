package com.sajilosarkar.sajilosarkar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pickup_order")
@Getter
@Setter
public class PickupOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Column(name = "order_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Column(name = "pickup_time", nullable = false)
    @Temporal(TemporalType.TIME)
    private LocalTime pickupTime;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @ManyToMany
    @JoinTable(
            name = "pickup_order_scrape_items",
            joinColumns = @JoinColumn(name = "pickup_order_id"),
            inverseJoinColumns = @JoinColumn(name = "scrape_item_id")
    )


    private List<ScrapeItems> scrapeItems;
}