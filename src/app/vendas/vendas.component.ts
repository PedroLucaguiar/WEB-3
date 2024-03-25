import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  dadosProduto: any = {};
  listaProdutos: any[] = [];
  produtoEmEdicao: any = null; // Variável para armazenar o produto em edição
  @ViewChild('adicionarProdutoModal') adicionarProdutoModal!: TemplateRef<any>;

  constructor(private router: Router,
    public modalService: NgbModal,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.http.get<any[]>('http://localhost:3000/api/vendas')
      .subscribe(
        response => {
          this.listaProdutos = response;
          console.log('Produtos carregados:', this.listaProdutos);
        },
        error => {
          console.error('Erro ao carregar produtos:', error);
        }
      );
  }

  editarProduto(id: number): void {
    console.log('ID do produto a ser editado:', id);
    const produto = this.listaProdutos.find(p => p.idprodutos === id);
    console.log('Produto a ser editado:', produto);
    if (produto) {
      this.produtoEmEdicao = { ...produto }; // Definindo o produto em edição
      console.log('Produto em edição:', this.produtoEmEdicao);
      // Mapeando os campos do produto em edição para os campos do formulário
      this.dadosProduto.nomeProduto = this.produtoEmEdicao.nome;

      this.dadosProduto.precoProduto = this.produtoEmEdicao.preco;
      this.dadosProduto.tamanhoProduto = this.produtoEmEdicao.tamanho;
      this.dadosProduto.pesoProduto = this.produtoEmEdicao.peso;
      this.dadosProduto.imagemProduto = this.produtoEmEdicao.imagem;
      this.dadosProduto.disponivelProduto = this.produtoEmEdicao.disponivel;
      this.dadosProduto.categoriaProduto = this.produtoEmEdicao.categoria;
      this.dadosProduto.estoqueProduto = this.produtoEmEdicao.estoque;
      // Abrindo o modal com os dados do produto em edição
      this.modalService.open(this.adicionarProdutoModal, { centered: true });
    } else {
      console.error('Produto não encontrado:', produto);
    }
  }



  excluirProduto(id: number): void {
    this.http.delete(`http://localhost:3000/api/vendas/${id}`)
      .subscribe(
        response => {
          console.log('Produto excluído com sucesso:', response);
          this.carregarProdutos();
        },
        error => {
          console.error('Erro ao excluir produto:', error);
        }
      );
  }



  onSubmit(): void {
    if (!this.dadosProduto.nomeProduto || !this.dadosProduto.precoProduto || !this.dadosProduto.tamanhoProduto || !this.dadosProduto.pesoProduto || !this.dadosProduto.imagemProduto || !this.dadosProduto.disponivelProduto || !this.dadosProduto.categoriaProduto || !this.dadosProduto.estoqueProduto) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (this.produtoEmEdicao) {
      // Se estiver editando, enviar uma solicitação PUT
      const url = `http://localhost:3000/api/vendas/${this.produtoEmEdicao.idprodutos}`;
      this.http.put(url, this.dadosProduto)
        .subscribe(
          response => {
            console.log('Produto editado com sucesso:', response);
            this.produtoEmEdicao = null; // Limpar o produto em edição
            this.carregarProdutos();
          },
          error => {
            console.error('Erro ao editar produto:', error);
          }
        );
    } else {
      // Se estiver adicionando, enviar uma solicitação POST
      this.http.post('http://localhost:3000/api/vendas', this.dadosProduto)
        .subscribe(
          response => {
            console.log('Produto adicionado com sucesso:', response);
            this.carregarProdutos();
          },
          error => {
            console.error('Erro ao adicionar produto:', error);
          }
        );
    }
  }

  redirectToCadastro(tipo: string): void {
    if (tipo === 'vendedor') {
      this.router.navigateByUrl('/cadastro');
    } else if (tipo === 'cliente') {
      // Se você tem uma aba específica para clientes, pode redirecionar para ela aqui
      // this.router.navigateByUrl('/cadastro-cliente');
    }
  }

  abrirModalAdicionarProduto(content: TemplateRef<any>): void {
    this.produtoEmEdicao = null; // Limpar o produto em edição
    this.dadosProduto = {}; // Limpar os dados do produto
    this.modalService.open(content, { centered: true });
  }



}




