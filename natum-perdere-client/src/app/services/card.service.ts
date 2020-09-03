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

  getAssociatedCards(associated_cards: Array<string>): Observable<any> {
    this.socket.emit('getAssociatedCards', {associated_cards : associated_cards});

    this.socket.on('associated_cards', associated_cards => {
      console.log(associated_cards);
      this.observer.next(associated_cards);
    });

    return this.getSocketDataObservable();
  }

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
  }
}
