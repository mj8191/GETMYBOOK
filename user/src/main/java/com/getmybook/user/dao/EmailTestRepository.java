package com.getmybook.user.dao;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.getmybook.user.model.Email;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailTestRepository extends JpaRepository<Email,String> {

}
