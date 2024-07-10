package com.getmybook.apigateway;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;

@Component
@Slf4j
public class ScheduledTasks {



    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(cron = "0 */10 * * * * ")
    public void reportCurrentTime() {
        log.info("The time is now {}",dateFormat);
    }
}
