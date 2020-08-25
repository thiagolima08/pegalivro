import { ClienteService } from './../services/cliente.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { Livro } from '../livro';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-alugar-livro',
  templateUrl: './alugar-livro.component.html',
  styleUrls: ['./alugar-livro.component.css']
})
export class AlugarLivroComponent implements OnInit {

  cliente = [];
  livros = [];
  @ViewChild('cpf') cpfInput: ElementRef

  constructor(private service: PedidoService ,private clienteService: ClienteService, private livroService: LivroService, private fb: FormBuilder) {}
  
  displayedColumnsCliente = ['nome','cpf','telefone','email']
  displayedColumnsLivros = ['select','titulo','autor','editora','preco']

  ngOnInit(): void {
    this.getLivros();
  }

  ngAfterContentChecked(){
    if(this.itensSelected){
      this.getValor();
    } else{
      this.valor=0;
    }
  }

  onSubmit(form){
    let dados = {
        cliente: this.cliente[0],
        itens: this.itensSelected,
        dataemprestimo: this.getDate(),
        valor: this.valor,
        pago: form.value.pago
      }
    console.log(dados);
    // this.service.save(dados)
  }

  getDate(){
  let d = new Date();
    if(d.getMonth()+1<10){
      return `${d.getDate()}/0${d.getMonth()+1}/${d.getFullYear()}`;
    }else{
      return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    }
  }

  getCliente(){
    let CPF = this.cpfInput.nativeElement.value
    this.clienteService.listarClientes()
      .subscribe(clientes=>{
        this.cliente=clientes.filter(cliente=>cliente.cpf===CPF)
      });
    this.cpfInput.nativeElement.value = "";
  }

  getLivros(){
    this.livroService.listarLivros().subscribe(livros=>{
      this.livros=livros.filter(livros=>livros.reservado===false)
    })
  }

  valor=0;
  getValor(){
    let total=0;
    for(let item of this.itensSelected){
      total+=item.preco;
    }
    this.valor = parseFloat(`${total}.toFixed(2)`)
  }

  dataSource = new MatTableDataSource<Livro>(this.livros);
  selection = new SelectionModel<Livro>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  itensSelected;
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: Livro):String {
    let array=[];
    array.push(this.selection.selected);
    this.itensSelected = array[0];

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

}
