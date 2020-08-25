import { Cliente } from '../cliente';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  
  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.clientes$=this.service.listarClientes();
  }


}
