package com.getmybook.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping(value = "/book")
public class Controller {
    @Autowired
    private ModelRepo modelRepo;
    @Autowired
    private BookRepository bookRepository;
    @PostMapping("/save")
    public Book saveBook(@RequestBody CreateRequest createRequest){
        Optional<Book> book2 = bookRepository.findById(createRequest.getId());
        Optional<Model> model = modelRepo.findByTitleIgnoreCaseAndAuthorIgnoreCaseAndImage(createRequest.getBookName(),createRequest.getAuthor(),createRequest.getImage());
        if(model.isPresent()){
                createRequest.setStatus("Published");


        } else {

            createRequest.setStatus("Pending");
        }

        Book book = new Book();
        book.setStatus(createRequest.getStatus());
        book.setBookName(createRequest.getBookName());
        book.setAuthor(createRequest.getAuthor());
        book.setSellerId(createRequest.getSellerId());
        if(book2.isEmpty()){
            book.setImage(createRequest.getImage());

        } else {
            book.setImage(book2.get().getImage());
        }
        book.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
        if(!createRequest.getSellPrice().isEmpty()){
            book.setSellPrice(createRequest.getSellPrice());
        }
        if(!createRequest.getMonthlyRentPrice().isEmpty()){
            book.setMonthlyRentPrice(createRequest.getMonthlyRentPrice());
        }
        if(!createRequest.getRentPrice().isEmpty()){
            book.setRentPrice(createRequest.getRentPrice());
        }
        return bookRepository.save(book);

    }

    @PostMapping("/saveModel")
    public Model saveModel(@RequestBody ModelCreateRequest createRequest){
        System.out.println(createRequest);
        Model model = new Model();
        model.setTitle(createRequest.getTitle());
        model.setAuthor(createRequest.getAuthor());
        model.setImage(createRequest.getImage());
        return modelRepo.save(model);

    }
    @GetMapping("saveImage")
    public void saveImage(@RequestParam String image,@RequestParam String id) {

        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {


        book.get().setImage(image);
        bookRepository.save(book.get());
    } else {
            Book book1 = new Book();
            book1.setImage(image);
            book1.setId(id);
        }



    }
    @GetMapping("/getAllBySellerId")
    public List getBookBySellerId(@RequestParam String sellerId){
         List<Book> list = bookRepository.getAllBySellerId(sellerId);
         if(list.isEmpty()) {
             return Collections.EMPTY_LIST;
         }
         return list;


    }
    @GetMapping("/search")
    public List search(@RequestParam String search){
        if(search.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        List<Book> list = bookRepository.search(search);
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }
    @GetMapping("/searchModel")
    public List searchModel(@RequestParam String search){
        if(search.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        List<Model> list = modelRepo.search(search);
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }

    @GetMapping("/getAllBook")
    public List getAllBook(){
        List<Book> list = bookRepository.findAll();
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }

    @GetMapping("getAllByStatus")
    public List getAllByStatus(){
        List<Book> list = bookRepository.getAllByStatus("Published");
        if(list.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return list;


    }

    @PostMapping("/updateStatus")
    public Book getModel(@RequestBody Book createRequest){
       Optional<Book> book =  bookRepository.findById(createRequest.getId());
       Book book1 = new Book();
       if(book.isPresent()){
        book1.setStatus(createRequest.getStatus());
        book1.setBookName(book.get().getBookName());
        book1.setAuthor(book.get().getAuthor());
        book1.setImage(book.get().getImage());
        book1.setId(book.get().getId());
        if(book.get().getRentPrice()!=null) {
            book1.setRentPrice(book.get().getRentPrice());
        }
           if(book.get().getMonthlyRentPrice()!=null) {
               book1.setMonthlyRentPrice(book.get().getMonthlyRentPrice());
           }
        if(book.get().getSellPrice()!=null) {
            book1.setSellerId(book.get().getSellerId());
        }
        book1.setUpdatedOn(String.valueOf(Instant.now().toEpochMilli()));
        Model model = new Model();
        model.setImage(book.get().getImage());
        model.setTitle(book.get().getBookName());
        model.setAuthor(book.get().getAuthor());
           modelRepo.save(model);
           return bookRepository.save(book1);
        }
    return book1;

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
