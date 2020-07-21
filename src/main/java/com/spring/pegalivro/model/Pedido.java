package com.spring.pegalivro.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "TB_PEDIDO")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @ManyToOne
    private Cliente cliente;

    @NotNull
    @ManyToMany
    private List<Livro> itens;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern= "dd/MM/yyyy")
    private LocalDate dataemprestimo;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern= "dd/MM/yyyy")
    private LocalDate datadevolucao;

    @NotNull
    private double valor;

    private double multa;

    @NotNull
    private boolean pago;

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Livro> getItens() {
        return itens;
    }

    public void setItens(List<Livro> itens) {
        this.itens = itens;
    }

    public LocalDate getDataemprestimo() {
        return dataemprestimo;
    }

    public void setDataemprestimo(LocalDate dataemprestimo) {
        this.dataemprestimo = dataemprestimo;
    }

    public LocalDate getDatadevolucao() {
        return datadevolucao;
    }

    public void setDatadevolucao(LocalDate datadevolucao) {
        this.datadevolucao = datadevolucao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public double getMulta() {
        return multa;
    }

    public void setMulta(Double multa) {
        this.multa = multa;
    }

    public boolean getPago() {
        return pago;
    }

    public void setPago(Boolean pago) {
        this.pago = pago;
    }
}
