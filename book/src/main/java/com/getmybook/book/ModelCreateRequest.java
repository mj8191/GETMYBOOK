package com.getmybook.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ModelCreateRequest {
    private String title;
    private String author;
    private String image;
}
