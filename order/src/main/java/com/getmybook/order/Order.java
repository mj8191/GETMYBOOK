package com.getmybook.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "order2")
public class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_id")
    private Integer orderId;
    private  String sellerId;
    private String buyerId;
    private String agentId;
    @OneToMany(mappedBy="Order")
    private Set<Item> items;

    private String status;
    private String updatedOn;

}

