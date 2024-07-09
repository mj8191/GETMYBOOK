package com.getmybook.user.dao;

import com.getmybook.user.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface AddressRepo extends JpaRepository<Address, Integer> {
    @Query("select u from Address u where u.userName = :userName")
    Address getAddressByUserName(@Param("userName") String userName);
}
