package com.getmybook.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter

@Getter
@Table(name = "Orders")
public class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;
    private  String sellerId;
    private String buyerId;
    private String agentId;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "order_id")
    private Set<Item> items;

    private String status;
    private String updatedOn;

}

