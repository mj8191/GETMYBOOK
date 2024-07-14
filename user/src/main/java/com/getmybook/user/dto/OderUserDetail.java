package com.getmybook.user.dto;

import com.getmybook.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OderUserDetail {

    User seller;
    User buyer;
}
