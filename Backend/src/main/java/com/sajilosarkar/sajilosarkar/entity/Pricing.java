package com.sajilosarkar.sajilosarkar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "pricing")
public class Pricing {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long pricingId;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ScrapeItems item;

    @Column(nullable = false)
    private Double price;

    @Column
    private Double discount;

    @Column
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column
    @Temporal(TemporalType.DATE)
    private Date endDate;


}
