package com.getmybook.order;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter

@Getter
@Table(name = "Item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer Id;
    private String image;
    private Integer rentPrice;
    @ManyToOne()
    @JoinColumn(name = "order_id")
    private Order order;
    private String bookName;
    private String sellerId;
}
