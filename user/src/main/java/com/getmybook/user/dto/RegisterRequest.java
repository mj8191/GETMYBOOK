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
    private String address;
    private String altitude;
    private String latitude;

}
