import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { ActivatedRoute,Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  cardCode: string;
  private _cardSub: Subscription;

  card;

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
      .subscribe(card => {
        this.card = card;
        console.log(this.card);
        this.dataRecieved = true;
      });

  }

}
