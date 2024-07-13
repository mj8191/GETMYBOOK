package com.getmybook.user.redisRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class EmailDao {
    @Autowired
    private RedisTemplate<String,Object> template;
    public static final String HASH_KEY = "key";


    public String save(String email,String code){
        template.opsForHash().put(HASH_KEY,email,code);
        return code;
    }

    public List<Object> findAll(){
        return template.opsForHash().values(HASH_KEY);
    }

    public String findCode(String email){
        System.out.println("called findCode() from DB");
        return  Objects.requireNonNull(template.opsForHash().get(HASH_KEY, email)).toString();
    }


    public String deleteProduct(String email){
        template.opsForHash().delete(HASH_KEY,email);
        return "email removed !!";
    }
}
