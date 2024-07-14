package com.getmybook.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "book")
public class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    private  String sellerId;
    private String buyerId;
    private String agentId;
    private String bookId;
    private String image;
    private String status;
    private String updatedOn;

}

