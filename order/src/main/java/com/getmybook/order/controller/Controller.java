package com.getmybook.order.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "/gateway/order")
public class Controller {
@GetMapping("/getOrder")

    public  String getOrder(){
    return "order";
}

}
