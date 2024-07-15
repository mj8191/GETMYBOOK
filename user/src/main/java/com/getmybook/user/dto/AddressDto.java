package com.getmybook.user.dto;

import com.getmybook.user.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddressDto {
    private String firstName;
    private String lastName;
    private String contact;
    private Address address;
}
