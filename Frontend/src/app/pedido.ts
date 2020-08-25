import { Cliente } from './cliente';
import { Livro } from './livro';

export interface Pedido{
    id: number;
    cliente: Cliente;
    itens: Livro[];
    dataemprestimo: String;
    datadevolucao: String;
    valor: number;
    multa: number;
    pago: boolean
}