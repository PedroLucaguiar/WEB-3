import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  dados = {
    primeiroNome: '',
    // Adicione outras propriedades conforme necessário para os outros campos do formulário de cad.
    termos: false
  };

  onSubmit() {
    // Aqui vc pode processar os dados do formulário, como enviar para um serviço ou API ---- imporntate, voltar depois
    console.log('Dados do formulário:', this.dados);
  }
}
