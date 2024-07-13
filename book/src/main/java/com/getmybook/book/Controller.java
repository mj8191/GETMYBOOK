package com.getmybook.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping(value = "/book")
public class Controller {
    @Autowired
    private BookRepository bookRepository;
    @PostMapping("/save")
    public Book saveBook(@RequestBody CreateRequest createRequest){
        System.out.println(createRequest);
        Book book = new Book();
        book.setBookName(createRequest.getBookName());
        book.setAuthor(createRequest.getAuthor());
        book.setRentPrice(createRequest.getRentPrice());
        book.setSellerId(createRequest.getSellerId());
        book.setImage(createRequest.getImage());
        book.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
        Book book1 = bookRepository.save(book);
        System.out.println(book1);
        return book1;

    }
    @GetMapping("/getAllBySellerId")
    public List getBookBySellerId(@RequestParam String sellerId){
         List<Book> list = bookRepository.getAllBySellerId(sellerId);
         if(list.isEmpty()) {
             return Collections.EMPTY_LIST;
         }
         return list;


    }

    @GetMapping("/deleteAll")
    public  void deleteAll(){
        bookRepository.deleteAll();
    }

    @GetMapping("/test")
    public String test(){
        return "test";
    }

}
