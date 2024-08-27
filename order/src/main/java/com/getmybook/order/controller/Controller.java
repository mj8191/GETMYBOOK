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
        order.setSellerId(createRequest.getSellerId());
        order.setBuyerId(createRequest.getBuyerId());
        order.setItems(createRequest.getItems());
        order.setAgentId("mj.eng8191@gmail.com");
        order.setStatus("ordered");
        order.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
        Order order1 = orderRepository.save(order);
        System.out.println(order1);
        return order1;

    }
    @GetMapping("/updateStatus")
    public Order updateOrderStatus(@RequestParam Integer id,@RequestParam String status){
        Optional<Order> order = orderRepository.findById(id);
        Order order2 = new Order();
        if(order.isPresent()){
            order2.setOrderId(id);
            order2.setSellerId(order.get().getSellerId());
            order2.setBuyerId(order.get().getBuyerId());
            order2.setItems(order.get().getItems());
            order2.setAgentId("mj.eng8191@gmail.com");
            order2.setStatus(status);
            order2.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
        }
        return order2;

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

    @GetMapping("/getAllByAgentId")
    public List getOrderByAgentId(@RequestParam String agentId){
        List<Order> list = orderRepository.getAllByAgentId(agentId);
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
        return "tesst";
    }

}