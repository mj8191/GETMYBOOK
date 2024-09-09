package com.getmybook.book;


import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "book")
public class Book {
    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;
    private  String sellerId;
    private String bookName;
    private String author;
    private String image;
    private  String status;
    private String monthlyRentPrice;
    private String rentPrice;
    private String sellPrice;
    private String updatedOn;

}
