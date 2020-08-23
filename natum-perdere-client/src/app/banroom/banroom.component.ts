import { Component, OnInit, OnDestroy } from '@angular/core';
import { BanroomService } from '../services/banroom.service';
import { Subscription } from 'rxjs';
import { Banroom } from '../../models/banroom';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-banroom',
  templateUrl: './banroom.component.html',
  styleUrls: ['./banroom.component.scss']
})
export class BanroomComponent implements OnInit {
  banroom: Banroom;
  private _roomSub: Subscription;

  constructor(private banroomService: BanroomService) { }

  ngOnInit() {
    this._roomSub = this.banroomService.currentBanroom.pipe(
      startWith({ id: '', creator: ''})
    ).subscribe(banroom => this.banroom = banroom);
  }

}
