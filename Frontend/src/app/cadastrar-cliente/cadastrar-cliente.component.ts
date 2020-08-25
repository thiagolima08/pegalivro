import { ClienteService } from './../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {

  form: FormGroup;
  
  constructor(private fb: FormBuilder, private service: ClienteService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null,
        [Validators.required,
        Validators.minLength(3)]
      ],
      email: [null,
        [Validators.email,
        Validators.required,
        Validators.minLength(4)]
      ],
      telefone: [null,[
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)]
      ],
      cpf: [null,[
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)]
      ]
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
