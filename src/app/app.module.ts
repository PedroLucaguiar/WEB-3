import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { FormsModule } from '@angular/forms'; // Importe FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { VendasComponent } from './vendas/vendas.component';
import { OnlyNumbersDirective } from './vendas/only-numbers.directive';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroComponent,
    VendasComponent,
    OnlyNumbersDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // Adicione o HttpClientModule aqui
    AppRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
