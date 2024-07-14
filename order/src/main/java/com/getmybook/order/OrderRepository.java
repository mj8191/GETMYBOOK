package com.getmybook.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> getAllBySellerId(String sellerId);
    List<Order> getAllByBuyerId(String buyerId);

    List<Order> getAllByAgentId(String agentId);
}
