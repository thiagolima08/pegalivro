import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { AlugarLivroComponent } from './alugar-livro/alugar-livro.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'cadastrar', component: CadastrarComponent},
  { path: 'alugar-livro', component: AlugarLivroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
