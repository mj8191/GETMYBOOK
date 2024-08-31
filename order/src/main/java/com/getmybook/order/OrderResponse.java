package com.getmybook.order;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@ToString
@Getter
public class OrderResponse {
    private Set<Item> items;
    private String status;
    private Integer id;
    private Integer price;
}
