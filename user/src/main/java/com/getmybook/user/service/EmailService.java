package com.getmybook.user.service;

import com.getmybook.user.dao.EmailTestRepository;
import com.getmybook.user.dao.UserRapository;
import com.getmybook.user.model.Email;
import com.getmybook.user.redisRepo.EmailDao;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
import java.util.Random;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    @Autowired
    private EmailTestRepository emailDao;
    @Autowired
    private UserRapository userRapository;



    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public String getOtp(String email) {
        String otp = generateOTP();
        Email email1 = new Email();
        if(userRapository.findById(email).isPresent()){
            return "Already registered, use a different email";
        }
       if(emailDao.findById(email).isPresent()){
           email1 = emailDao.findById(email).get();
           email1.setOtp(otp);
           emailDao.save(email1);
       }else {
           email1.setEmail(email);
           email1.setOtp(otp);
           emailDao.save(email1);
       }
        sendVerificationEmail(email,otp);
        System.out.println(emailDao.findById(email));
        return email;
    }


    private String generateOTP(){
        Random random = new Random();
        int otpValue = 1000 + random.nextInt(9000);
        return String.valueOf(otpValue);
    }
    private void sendVerificationEmail(String email,String otp){
        String subject = "Email verification";
        String body ="your verification otp is: "+otp;
        sendEmail(email,subject,body);
    }
    public void sendEmail(String to,String subject,String body) {

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body,true);
            javaMailSender.send(message);
        } catch (MessagingException e) {

            throw new RuntimeException(e);
        }

    }
}
