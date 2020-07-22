package com.spring.pegalivro.controller;

import com.spring.pegalivro.model.Livro;
import com.spring.pegalivro.service.LivroService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class LivroController {

    @Autowired
    LivroService livroService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/livros")
    public List<Livro> listarLivros(){
        List<Livro> livros = livroService.findAll();
        return livros;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/livros/{id}")
    public ResponseEntity<Livro> buscarLivro(@PathVariable(value = "id") long id){
        Livro livro = livroService.findById(id);

        if(livro == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(livro);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/livros")
    public Livro cadastrarLivro(@Valid @RequestBody Livro livro){
        return livroService.save(livro);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/livros/{id}")
    public ResponseEntity<Void> excluirLivro(@PathVariable(value = "id") long id){
        Livro livro = livroService.findById(id);
        if (livro == null) {
            ResponseEntity.notFound().build();
        }
        livroService.delete(livro);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/livros/{id}")
    public ResponseEntity<Livro> alterarLivro(@PathVariable(value = "id") long id, @Valid @RequestBody Livro livro){
        Livro livroToUpdate = livroService.findById(id);

        if(livroToUpdate == null){
            return ResponseEntity.notFound().build();
        }
        BeanUtils.copyProperties(livro, livroToUpdate,"id");
        livroToUpdate = livroService.save(livroToUpdate);
        return ResponseEntity.ok(livroToUpdate);
    }
}
