import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Cliente } from '../cliente';
 
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = `${environment.API}clientes`;

  constructor(private http: HttpClient) { }

  listarClientes() {
    return this.http.get<Cliente[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  buscarClienteByID(id) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }


  private cadastrarCliente(cliente) {
    return this.http.post(this.API, cliente).pipe(take(1));
  }

  private alterarCliente(cliente) {
    return this.http.put(`${this.API}/${cliente.id}`, cliente).pipe(take(1));
  }

  save(cliente) {
    if (cliente.id) {
      return this.alterarCliente(cliente);
    }
    return this.cadastrarCliente(cliente);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
