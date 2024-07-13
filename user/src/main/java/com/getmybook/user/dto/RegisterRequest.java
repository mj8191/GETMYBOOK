package com.getmybook.user.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterRequest {

    private String userName;
    public String password;
    private String firstName;
    private  String lastName;
    private String contact;
    private String line1;
    private String line2;
    private String dist;
    private String state;
    private Integer pin;

}
