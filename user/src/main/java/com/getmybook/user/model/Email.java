package com.getmybook.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "email")
public class Email {
    @JsonProperty("email")
    @Id
    @Column(name = "email")
    private String email = null;
    @JsonProperty("otp")
    private String otp = null;

}
