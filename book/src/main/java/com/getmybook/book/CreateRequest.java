package com.getmybook.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateRequest{
    private Integer id;
    private  String sellerId;
    private String bookName;
    private String author;
    private  String image;
    private String status;
    private String monthlyRentPrice;
    private String rentPrice;
    private String sellPrice;
}
