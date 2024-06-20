package com.sajilosarkar.sajilosarkar.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pickup_order")
public class PickupOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private User customer;

    @Column(name = "order_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Column(name = "pickup_time", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date pickupTime;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @OneToMany(mappedBy = "pickupOrder", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    public Long getOrderId(){
         return orderId; 
        }
    public void setOrderId(Long orderId) {
         this.orderId = orderId; 
        }
    public User getCustomer() {
         return customer; 
    }
    public void setCustomer(User customer) { 
        this.customer = customer; 
    }
    public Date getOrderDate() {
         return orderDate; 
    }
    public void setOrderDate(Date orderDate) {
         this.orderDate = orderDate; 
    }
    public Date getPickupTime() {
         return pickupTime;
     }
    public void setPickupTime(Date pickupTime) {
         this.pickupTime = pickupTime; 
    }
    public Double getTotalPrice() { 
        return totalPrice; 
    }
    public void setTotalPrice(Double totalPrice) { 
        this.totalPrice = totalPrice;
     }


}
