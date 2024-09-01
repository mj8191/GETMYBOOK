package com.getmybook.book;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    private  String sellerId;
    private String bookName;
    private String author;
    private String image;
    private  String status;

    private String rentPrice;
    private String sellPrice;
    private String updatedOn;

}
