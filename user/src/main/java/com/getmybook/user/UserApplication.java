package com.getmybook.user;

import com.getmybook.user.redisRepo.EmailDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserApplication {


	public static void main(String[] args) {


		SpringApplication.run(UserApplication.class, args);

	}

}
