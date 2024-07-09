package com.getmybook.user.controller;

import com.getmybook.user.dao.AddressRepo;
import com.getmybook.user.dao.EmailTestRepository;
import com.getmybook.user.dao.UserRapository;
import com.getmybook.user.dto.AuthRequest;
import com.getmybook.user.dto.EmailOtpRequest;
import com.getmybook.user.dto.RegisterRequest;
import com.getmybook.user.dto.UserDetail;
import com.getmybook.user.model.Email;
import com.getmybook.user.model.User;
import com.getmybook.user.redisRepo.EmailDao;
import com.getmybook.user.service.AuthService;
import com.getmybook.user.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
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
    private EmailTestRepository emailDao;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public UserDetail addNewUser(@RequestBody RegisterRequest user) {
        return service.saveUser(user);
    }
    @PostMapping("/verifyOtp")
    public Boolean addNewUser(@RequestBody EmailOtpRequest request) {
        Optional<Email> email1 = emailDao.findById(request.getUserName());
        if(email1.isPresent()){

            return request.getOtp().equals( email1.get().getOtp());

        } else {
            return false;
        }
    }

    @GetMapping("/getOtp")
    public String getOtp(@RequestParam String email) {
        return emailService.getOtp(email);
    }
    @GetMapping("/verifyEmail")
    public Boolean verifyEmail(@RequestParam String email,@RequestParam String otp) {
        System.out.println("verify");
        Optional<Email> email1 = emailDao.findById(email);
        if(email1.isPresent()){
            System.out.println(email1.get().getOtp());
            System.out.println(otp);
            System.out.println(email);
       return otp.equals( email1.get().getOtp());

        } else {
            return false;
        }
    }

    @GetMapping("/getUser")
    public User addNewUser(@RequestParam String userName) {

        Optional<User> user = repository.findById(userName);
        return user.orElse(null);
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
