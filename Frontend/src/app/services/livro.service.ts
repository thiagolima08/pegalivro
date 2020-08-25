import { Livro } from '../livro';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = `${environment.API}livros`;
  constructor(private http: HttpClient) { }

  listarLivros() {
    return this.http.get<Livro[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  buscarLivroByID(id) {
    return this.http.get<Livro>(`${this.API}/${id}`).pipe(take(1));
  }

  private cadastrarLivro(livro) {
    return this.http.post(this.API, livro).pipe(take(1));
  }

  private alterarLivro(livro) {
    return this.http.put(`${this.API}/${livro.id}`, livro).pipe(take(1));
  }

  save(livro) {
    if (livro.id) {
      return this.alterarLivro(livro);
    }
    return this.cadastrarLivro(livro);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
