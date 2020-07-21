package com.spring.pegalivro.repository;

import com.spring.pegalivro.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
