package com.getmybook.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String Id;
    private String image;
    private Integer rentPrice;
    @ManyToOne
    @JoinColumn(name = "cart_id", insertable = false, updatable = false)
    private Order order;
    private String bookName;
}
