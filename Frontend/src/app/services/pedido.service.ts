import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../pedido';
import { delay, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly API = `${environment.API}pedidos`;
  
  constructor(private http: HttpClient) { }

  listarPedidos() {
    return this.http.get<Pedido[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  buscarPedidoByID(id) {
    return this.http.get<Pedido>(`${this.API}/${id}`).pipe(take(1));
  }

  private cadastrarPedido(pedido) {
    return this.http.post(this.API, pedido).pipe(take(1));
  }

  private alterarPedido(pedido) {
    return this.http.put(`${this.API}/${pedido.id}`, pedido).pipe(take(1));
  }

  save(pedido) {
    if (pedido.id) {
      return this.alterarPedido(pedido);
    }
    return this.cadastrarPedido(pedido);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
