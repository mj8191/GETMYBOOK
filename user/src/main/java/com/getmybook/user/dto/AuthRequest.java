package com.getmybook.user.dto;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class AuthRequest {
    private String userName;
    private String password;

}
