import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Banroom } from '../../models/banroom';

@Injectable({
  providedIn: 'root'
})
export class BanroomService {
  currentBanroom = this.socket.fromEvent<Banroom>('banroom');

  constructor(private socket: Socket) { }

  getBanroom(id: string) {
    this.socket.emit('getRoom', {id : id});
  }

  newRoom() {
    this.socket.emit('addRoom', { id: this.roomId(), creator: ''})

    this.socket.on('banroom', room => {
      console.log(room);
    })
  }

  private roomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
