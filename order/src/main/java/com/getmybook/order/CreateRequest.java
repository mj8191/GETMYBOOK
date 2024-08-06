package com.getmybook.order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateRequest{
    private  String sellerId;
    private String buyerId;
    private String image;
    private String bookId;
    private String bookName;
}