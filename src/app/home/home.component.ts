import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToCadastro(tipo: string): void {
    if (tipo === 'vendedor') {
      this.router.navigateByUrl('/cadastro');
    } else if (tipo === 'cliente') {
      // Se você tem uma aba específica para clientes, você pode redirecionar para ela aqui
      // this.router.navigateByUrl('/cadastro-cliente');
    }
  }
}
