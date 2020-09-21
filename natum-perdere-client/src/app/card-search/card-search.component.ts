import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent implements OnInit {
  faSearch = faSearch;
  
  allCards;
  private _allCardsSub: Subscription;
  term: string;

  constructor(
    private cardService : CardService
  ) {}

  ngOnInit(): void {
    this._allCardsSub = this.cardService.getAllCards()
      .pipe(take(1))
      .subscribe(allCards => {
        this.allCards = allCards;
        console.log(this.allCards);
      })

  }

}
