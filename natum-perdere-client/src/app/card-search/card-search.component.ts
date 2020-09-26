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

  query: string;

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

  heroes = [
  { id: 11, name: 'Mr. Nice', country: 'India' },
  { id: 12, name: 'Narco' , country: 'USA'},
  { id: 13, name: 'Bombasto' , country: 'UK'},
  { id: 14, name: 'Celeritas' , country: 'Canada' },
  { id: 15, name: 'Magneta' , country: 'Russia'},
  { id: 16, name: 'RubberMan' , country: 'China'},
  { id: 17, name: 'Dynama' , country: 'Germany'},
  { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
  { id: 19, name: 'Magma' , country: 'South Africa'},
  { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
];

}
