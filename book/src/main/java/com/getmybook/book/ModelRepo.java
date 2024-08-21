package com.getmybook.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ModelRepo extends JpaRepository<Model,String> {

    @Query("SELECT b FROM Model b WHERE CONCAT(b.title,b.author) LIKE %?1%")
    public List<Model> search(String keyword);
}
