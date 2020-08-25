import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { BanroomService } from '../services/banroom.service';
import { Banroom } from '../../models/banroom';


@Component({
  selector: 'app-banroom',
  templateUrl: './banroom.component.html',
  styleUrls: ['./banroom.component.scss']
})
export class BanroomComponent implements OnInit {
  banroom: Banroom;
  room_id;
  private _roomSub: Subscription;

  constructor(
    private banroomService: BanroomService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.room_id = params.get("ban_id")
      console.log(params.get("ban_id"));
    })

    // this.banroomService.getBanroom();
    this._roomSub = this.banroomService.getBanroom(this.room_id)
      .subscribe(banroom => this.banroom = banroom);
    console.log(this.banroom)
  }

}
