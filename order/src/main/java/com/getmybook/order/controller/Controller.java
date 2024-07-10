package com.getmybook.order.controller;

import com.getmybook.order.OrderRepository;
import com.getmybook.order.Order;
import com.getmybook.order.CreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping(value = "/order")
public class Controller {
    @Autowired
    private OrderRepository orderRepository;
    @PostMapping("/save")
    public Order saveBook(@RequestBody CreateRequest createRequest){
        System.out.println(createRequest);
        Order order = new Order();
        order.setBookId(createRequest.getBookId());
        order.setSellerId(createRequest.getSellerId());
        order.setBuyerId(createRequest.getBuyerId());
        order.setImage(createRequest.getImage());
        order.setStatus("ordered");
        order.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
        Order order1 = orderRepository.save(order);
        System.out.println(order1);
        return order1;

    }
    @GetMapping("/updateStatus")
    public void updateOrderStatus(@PathVariable Integer id,@PathVariable String status){
        Optional<Order> order = orderRepository.findById(id);
        if(order.isPresent()){
        Order order1 = new Order();
            order1.setId(order.get().getId());
            order1.setBookId(order.get().getBookId());
            order1.setSellerId(order.get().getSellerId());
            order1.setBuyerId(order.get().getBuyerId());
            order1.setImage(order.get().getImage());
            order1.setStatus(status);
            order1.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
            orderRepository.save(order1);
        }


    }
    @GetMapping("/getAll")
    public List getAll(){
        List<Order> list = orderRepository.findAll();
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }
    @GetMapping("/getAllBySellerId")
    public List getOrderBySellerId(@RequestParam String sellerId){
        List<Order> list = orderRepository.getAllBySellerId(sellerId);
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }
    @GetMapping("/getAllByBuyerId")
    public List getOrderByBuyerId(@RequestParam String buyerId){
        List<Order> list = orderRepository.getAllByBuyerId(buyerId);
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }


    @GetMapping("/deleteAll")
    public  void deleteAll(){
        orderRepository.deleteAll();
    }

    @GetMapping("/test")
    public String test(){
        return "test";
    }

}