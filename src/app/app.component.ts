import { Component } from '@angular/core';
import { ChatService } from '../service/socket.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMessage: string = 'Hola';
  activo: boolean = false;
  opcionA: string = 'A';
  opcionB: string = 'B';
  opcionC: string = 'C';
  resultado: string = 'Todavía no hay ganador!'
  messageList: any[] = [];
  imagen: string = '../assets/img4.jpg'


  constructor(
    public activatedRoute: ActivatedRoute,
    private chatService: ChatService){

  }

  ngOnInit(){
    /*this.reiniciar()*/
    this.activo = false;
    this.resultado = 'Esperando'
    this.chatService.reiniciar()

    this.chatService.getNewMessage().subscribe((message: any) => {
      /*this.messageList.push(message.a);*/    
      this.imagen = message.imagen;
      this.opcionA = message.a;
      this.opcionB = message.b;
      this.opcionC = message.c;
    })   
    
  }

  sendMessage(mensaje: string) {
    this.activo = true;
    this.imagen = '../assets/img4.jpg'
    this.chatService.sendMessage(mensaje);
    
    this.chatService.getResultado().subscribe((message2: any) => {    
      this.resultado = message2; 
      console.log(message2)      
    });
   

  
    /*this.reiniciar()*/
  }

  reiniciar() {
    
    this.resultado = 'aaaa'
    console.log(this.resultado)
    this.chatService.reiniciar();
    this.activo = false;
    
  }

}