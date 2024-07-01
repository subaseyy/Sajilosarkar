package com.sajilosarkar.sajilosarkar.dto;

import com.sajilosarkar.sajilosarkar.entity.ScrapeItems;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.sql.Date;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PickupOrderDTO {
    private Long orderId;
    private Long customerId;
    private Date orderDate;
    private Date pickupTime;
    private Double totalPrice;
    private List<ScrapeItems> scrapeItem;
}
