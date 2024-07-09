package com.getmybook.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Email {
    @JsonProperty("email")
    @Id
    private String email = null;
    @JsonProperty("otp")
    private String otp = null;

}
