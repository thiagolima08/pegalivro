package com.spring.pegalivro.repository;

import com.spring.pegalivro.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}
