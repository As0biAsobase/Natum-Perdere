import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Banroom } from '../../models/banroom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanroomService {
  currentBanroom = this.socket.fromEvent<Banroom>('banroom');

  constructor(private socket: Socket) { }

  observer;
  getBanroom(id: string): Observable<any> {
    this.socket.emit('getRoom', {id : id});

    this.socket.on('banroom', room => {
      // console.log(room);
      this.observer.next(room)
    })
    return this.getSocketDataObservable();
  }

  newRoom(): Observable<any> {
    this.socket.emit('addRoom', { id: this.roomId(), creator: ''})

    this.socket.on('banroom', room => {
      // console.log(room);
      this.observer.next(room)
    })
    return this.getSocketDataObservable();
  }

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
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
