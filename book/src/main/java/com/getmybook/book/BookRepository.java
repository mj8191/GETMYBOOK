package com.getmybook.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

    List<Book> getAllBySellerId(String sellerId);
    List<Book> getAllByStatus(String status);

    @Query("SELECT b FROM Book b WHERE b.bookName LIKE %?1%")
    public List<Book> search(String keyword);
}
