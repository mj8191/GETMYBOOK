package com.getmybook.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddressResponse {
    private Integer id;
    private String userName;
    private String type;
    private String line1;
    private String line2;
    private String dist;
    private String state;
    private Integer pin;
}
