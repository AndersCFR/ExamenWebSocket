import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('data', (message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();    
  };

  public getResultado = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });  
    return this.message$.asObservable();
  };

  public reiniciar() {
    this.socket.emit('reiniciar');
  }

}