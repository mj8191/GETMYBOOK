package com.getmybook.user.dao;

import com.getmybook.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public interface UserRapository extends JpaRepository<User,String> {
    Optional<User> findAllByUserName(String string);
}
