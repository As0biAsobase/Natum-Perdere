import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private socket: Socket) { }
  card;
  observer;

  getCard(cardCode: string): Observable<any> {
    this.socket.emit('getCard', {cardCode : cardCode});

    this.socket.on('card', card => {
      this.observer.next(card);
    })
    return this.getSocketDataObservable();
  }

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
  }
}
