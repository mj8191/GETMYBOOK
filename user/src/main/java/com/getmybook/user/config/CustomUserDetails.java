package com.getmybook.user.config;

import com.getmybook.user.dao.UserRapository;
import com.getmybook.user.model.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

public class CustomUserDetails implements UserDetails {
    @Autowired
    private UserRapository rapository;

    private String username;
    private String password;

    public CustomUserDetails(User userCredential) {
        this.username = userCredential.getUserName();
        this.password = userCredential.getPassword();
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
