package com.spring.pegalivro.service;

import com.spring.pegalivro.model.Cliente;

import java.util.List;

public interface ClienteService {

    List<Cliente> findAll();
    Cliente findById(Long id);
    Cliente save(Cliente cliente);
    void delete(Cliente cliente);
}
