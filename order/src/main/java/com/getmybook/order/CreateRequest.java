package com.getmybook.order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateRequest{
    private  String sellerId;
    private String buyerId;
    private Set<Item> items;
}