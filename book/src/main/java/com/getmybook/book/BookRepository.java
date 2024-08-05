package com.getmybook.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

    List<Book> getAllBySellerId(String sellerId);

    @Query("SELECT b FROM Book b WHERE CONCAT(b.bookName,b.author) LIKE %?1%")
    public List<Book> search(String keyword);
}
