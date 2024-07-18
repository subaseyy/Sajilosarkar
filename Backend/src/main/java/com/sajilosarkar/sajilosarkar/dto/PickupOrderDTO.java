package com.sajilosarkar.sajilosarkar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;
import java.util.Date;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PickupOrderDTO {
    private Long orderId;
    private Integer customerId;
    private Date orderDate;
    private LocalTime pickupTime;
    private Double totalPrice;
    private List<ScrapeItemDto> scrapeItems;
}
