package com.getmybook.book;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "model")
public class Model {
    @Id
    private String title;
    private String author;
    private String image;


}
