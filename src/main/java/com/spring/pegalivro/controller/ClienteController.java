package com.spring.pegalivro.controller;

import com.spring.pegalivro.model.Cliente;
import com.spring.pegalivro.service.ClienteService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> listarClientes(){
        List<Cliente> clientes = clienteService.findAll();
        return clientes;
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> buscarCliente(@PathVariable(value = "id") long id){
        Cliente cliente = clienteService.findById(id);

        if(cliente == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/clientes")
    public Cliente cadastrarCliente(@Valid @RequestBody Cliente cliente){
        return clienteService.save(cliente);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> excluirCliente(@PathVariable(value = "id") long id){
        Cliente cliente = clienteService.findById(id);
        if (cliente == null) {
            ResponseEntity.notFound().build();
        }
        clienteService.delete(cliente);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> alterarCliente(@PathVariable(value = "id") long id, @Valid @RequestBody Cliente cliente){
        Cliente clienteToUpdate = clienteService.findById(id);

        if(clienteToUpdate == null){
            return ResponseEntity.notFound().build();
        }
        BeanUtils.copyProperties(cliente, clienteToUpdate,"id");
        clienteToUpdate = clienteService.save(clienteToUpdate);
        return ResponseEntity.ok(clienteToUpdate);
    }
}
