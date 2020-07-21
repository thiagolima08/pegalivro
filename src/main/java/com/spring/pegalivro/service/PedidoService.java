package com.spring.pegalivro.service;

import com.spring.pegalivro.model.Pedido;

import java.util.List;

public interface PedidoService {
    List<Pedido> findAll();
    Pedido findById(Long id);
    Pedido save(Pedido pedido);
    void delete(Pedido pedido);
}
