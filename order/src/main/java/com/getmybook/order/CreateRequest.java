package com.getmybook.order;
import lombok.*;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@ToString
@Getter
public class CreateRequest{
    private  String sellerId;
    private String buyerId;
    private Set<Item> items;
}