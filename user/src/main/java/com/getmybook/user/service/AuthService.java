package com.getmybook.user.service;

import com.getmybook.user.dao.AddressRepo;
import com.getmybook.user.dto.AddressDto;
import com.getmybook.user.dto.AddressResponse;
import com.getmybook.user.dto.RegisterRequest;
import com.getmybook.user.dto.UserDetail;
import com.getmybook.user.model.Address;
import com.getmybook.user.model.User;
import com.getmybook.user.dao.UserRapository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRapository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private JwtService jwtService;

    public UserDetail saveUser(RegisterRequest credential) {
        System.out.println(credential);
        User user = new User();
        user.setUserName(credential.getUserName());
        user.setPassword(passwordEncoder.encode(credential.getPassword()));
        user.setFirstName(credential.getFirstName());
        user.setLastName(credential.getLastName());
        user.setContact(credential.getContact());
        user.setAddress(credential.getAddress());
        user.setAltitude(credential.getAltitude());
        user.setLatitude(credential.getLatitude());
        User user1 = repository.save(user);

        UserDetail userDetail= new UserDetail();
        userDetail.setUserName(user1.getUserName());
        userDetail.setFirstName(user1.getFirstName());
        userDetail.setLastName(user1.getLastName());
        userDetail.setContact(user1.getContact());
        userDetail.setAddress(user1.getAddress());
        userDetail.setAltitude(user1.getAltitude());
        userDetail.setLatitude(user1.getLatitude());
        userDetail.setToken(generateToken(user1.getUserName()));
        return userDetail;
    }
    public UserDetail login(String userName){
        Optional<User> user1 = repository.findAllByUserName(userName);
        UserDetail userDetail= new UserDetail();

            userDetail.setUserName(user1.get().getUserName());
            userDetail.setFirstName(user1.get().getFirstName());
            userDetail.setLastName(user1.get().getLastName());
            userDetail.setContact(user1.get().getContact());
            userDetail.setAddress(user1.get().getAddress());
            userDetail.setAltitude(user1.get().getAltitude());
            userDetail.setLatitude(user1.get().getLatitude());
            userDetail.setToken(generateToken(user1.get().getUserName()));
            return userDetail;


    }

    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }


}
