package com.getmybook.order;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
@Component
@Slf4j
public class ScheduledTasks {
    @Autowired
    private OrderRepository orderRepository;
    @Scheduled(fixedRate = 5000)
        public void reportCurrentTime() {
            log.info("The time is now {}","");
        }

}
