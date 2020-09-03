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
  //card image
  card_image;
  //associated cards
  associated_cards = [];

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
        this.card_image = card.assets[0].gameAbsolutePath;

        console.log(this.card);
        this.dataRecieved = true;

        console.log(card.associatedCardRefs);
        if (card.associatedCardRefs.length > 0) {
          this.cardService.getAssociatedCards(card.associatedCardRefs)
            .pipe(take(1))
            .subscribe(associated_cards => {
              console.log(associated_cards);
              this.associated_cards = associated_cards;
            });
        }
        console.log(this.associated_cards);
      });

  }

}
