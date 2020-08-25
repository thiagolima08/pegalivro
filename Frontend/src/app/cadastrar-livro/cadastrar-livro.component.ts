import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-livro.component.html',
  styleUrls: ['./cadastrar-livro.component.css']
})
export class CadastrarLivroComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: LivroService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [null,
        [Validators.required,
        Validators.minLength(3)]],
      autor: [null,
        [Validators.required,
        Validators.minLength(3)]],
      editora: [null,
        [Validators.required]],
      isbn: [null,
        [Validators.required,
        Validators.minLength(13)]],
      preco: [null,[
        Validators.required]],
      reservado: [false]
    })
  }

  onSubmit(){
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(
      success => console.log('sucesso'),
      error => console.error(error),
      () => console.log('requisição completa')
    );
    this.form.reset();
  }

}
