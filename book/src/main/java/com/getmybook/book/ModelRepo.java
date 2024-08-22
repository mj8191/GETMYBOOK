package com.getmybook.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ModelRepo extends JpaRepository<Model,String> {

    @Query("SELECT b FROM Model b WHERE b.title LIKE %?1%")
    public List<Model> search(String keyword);

    public Optional<Model> findByTitleIgnoreCaseAndAuthorIgnoreCaseAndImage(String title, String author, String image);

}
