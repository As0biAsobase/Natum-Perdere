import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { ActivatedRoute,Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  cardCode: string;
  private _cardSub: Subscription;

  //card object
  card;
  //associated cards
  associated_cards = [];

  //queue of all relevant cards displayed on the right side
  cards_right = []

  //queue of all cards displayed on the left
  cards_left = []

  //This is a workaround, need to fix to ensure correct async, look into Promises, Pipes
  dataRecieved = false;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cardCode = params.get("card_code")
      console.log(params.get("card_code"));
    })

    this._cardSub = this.cardService.getCard(this.cardCode)
      .pipe(take(1))
      .subscribe(card => {
        this.card = card;

        console.log(this.card);
        this.dataRecieved = true;

        //construct all cards array by adding main cards and then adding all related if we got any
        this.cards_right.push(card);

        console.log(card.associatedCardRefs);
        if (card.associatedCardRefs.length > 0) {
          this.cardService.getAssociatedCards(card.associatedCardRefs)
            .pipe(take(1))
            .subscribe(associated_cards => {
              console.log(associated_cards.length);
              this.associated_cards = associated_cards;

              //associated_cards received, can add them to array
              // this.associated_cards.forEach(card => this.cards_right.push(card));
              this.cards_right = this.associated_cards.slice().reverse();
            });
        }

      });
  }

  //moving cards "carousel" left and right, using queues
  moveRightFunction() {
    if (this.cards_right.length > 0) {
      this.cards_left.push(this.card);
      this.card = this.cards_right.pop();
    }
    console.log(this.cards_right);
  }

  moveLeftFunction() {
    if (this.cards_left.length > 0) {
      this.cards_right.push(this.card);
      this.card = this.cards_left.pop();
    }
    console.log(this.cards_left);
  }
}
