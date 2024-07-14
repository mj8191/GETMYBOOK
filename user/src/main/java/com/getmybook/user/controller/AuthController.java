package com.getmybook.user.controller;

import com.getmybook.user.dao.AddressRepo;
import com.getmybook.user.dao.EmailTestRepository;
import com.getmybook.user.dao.UserRapository;
import com.getmybook.user.dto.*;
import com.getmybook.user.model.Email;
import com.getmybook.user.model.User;
import com.getmybook.user.redisRepo.EmailDao;
import com.getmybook.user.service.AuthService;
import com.getmybook.user.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.OrderUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService service;
    @Autowired
    private UserRapository repository;
    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailDao emailDao;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public UserDetail addNewUser(@RequestBody RegisterRequest user) {
        return service.saveUser(user);
    }
    @PostMapping("/verifyOtp")
    public Boolean addNewUser(@RequestBody EmailOtpRequest request) {
        String email1 = emailDao.findCode(request.getUserName());


            return request.getOtp().equals( email1);


    }

    @GetMapping("/getOtp")
    public String getOtp(@RequestParam String email) {
        return emailService.getOtp(email);
    }
    @GetMapping("/verifyEmail")
    public Boolean verifyEmail(@RequestParam String email,@RequestParam String otp) {

        String code = emailDao.findCode(email);


        return otp.equals( code);
    }


    @GetMapping("/getUser")
    public User addNewUser(@RequestParam String userName) {

        Optional<User> user = repository.findById(userName);
        return user.orElse(null);
    }

    @GetMapping("/getOderUserDetail")
    public OderUserDetail getOderUserDetail(@RequestParam String sellerName,@RequestParam String buyerName) {

        Optional<User> seller = repository.findById(sellerName);
        Optional<User> buyer = repository.findById(buyerName);
        OderUserDetail oderUserDetail = new OderUserDetail();
        if(seller.isPresent()&&buyer.isPresent()) {
            oderUserDetail.setSeller(seller.get());
            oderUserDetail.setBuyer(buyer.get());
        }
        return oderUserDetail;
    }

    @PostMapping("/login")
    public UserDetail getToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));

            if (authenticate.isAuthenticated()) {
                return service.login(authRequest.getUserName());
            } else {
                UserDetail userDetail = new UserDetail();
                userDetail.setToken("Email or Password is incorrect");
                return userDetail;
            }
        } catch (AuthenticationException e){
            UserDetail userDetail = new UserDetail();
            userDetail.setToken("Email or Password is incorrect");
            return userDetail;

        }

    }

    @GetMapping("/deleteUser")
    public void deleteUser(){
        repository.deleteAll();

    }
    @GetMapping("/deleteAddress")
    public void deleteAddress(){
        addressRepo.deleteAll();

    }


}
