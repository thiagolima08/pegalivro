package com.spring.pegalivro.service.serviceimpl;

import com.spring.pegalivro.model.Livro;
import com.spring.pegalivro.repository.LivroRepository;
import com.spring.pegalivro.service.LivroService;
import org.hibernate.annotations.Cascade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroServiceImpl implements LivroService {

    @Autowired
    LivroRepository livroRepository;

    @Override
    public List<Livro> findAll() {
        return livroRepository.findAll();
    }

    @Override
    public Livro findById(Long id) {
        return livroRepository.findById(id).get();
    }

    @Override
    public Livro save(Livro livro) {
        return livroRepository.save(livro);
    }

    @Override
    public void delete(Livro livro) {
        livroRepository.delete(livro);
    }

}
