package com.getmybook.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateRequest{
    private  String sellerId;
    private String bookName;
    private String author;
    private  String image;

    private String rentPrice;
}
