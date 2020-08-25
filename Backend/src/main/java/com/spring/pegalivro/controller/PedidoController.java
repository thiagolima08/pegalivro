package com.spring.pegalivro.controller;

import com.spring.pegalivro.model.Pedido;
import com.spring.pegalivro.service.PedidoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class PedidoController {

    @Autowired
    PedidoService pedidoService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/pedidos")
    public List<Pedido> listarPedidos(){
        List<Pedido> pedidos = pedidoService.findAll();
        return pedidos;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/pedidos/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable(value = "id") long id){
        Pedido pedido = pedidoService.findById(id);

        if(pedido == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pedido);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/pedidos")
    public Pedido cadastrarPedido(@Valid @RequestBody Pedido pedido){
        return pedidoService.save(pedido);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/pedidos/{id}")
    public ResponseEntity<Void> excluirPedido(@PathVariable(value = "id") long id){
        Pedido pedido = pedidoService.findById(id);
        if (pedido == null) {
            ResponseEntity.notFound().build();
        }
        pedidoService.delete(pedido);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/pedidos/{id}")
    public ResponseEntity<Pedido> alterarPedido(@PathVariable(value = "id") long id, @Valid @RequestBody Pedido pedido){
        Pedido pedidoToUpdate = pedidoService.findById(id);
        if(pedidoToUpdate == null){
            return ResponseEntity.notFound().build();
        }
        BeanUtils.copyProperties(pedido, pedidoToUpdate,"id");

        pedidoToUpdate = pedidoService.save(pedidoToUpdate);
        return ResponseEntity.ok(pedidoToUpdate);
    }

}
