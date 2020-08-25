import { Component, OnInit, OnDestroy } from '@angular/core';
import { BanroomService } from '../services/banroom.service';
import { Subscription } from 'rxjs';
import { Banroom } from '../../models/banroom';
import { startWith } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-banroom-creation',
  templateUrl: './banroom-creation.component.html',
  styleUrls: ['./banroom-creation.component.scss']
})
export class BanroomCreationComponent implements OnInit {
  private _roomSub: Subscription;

  constructor(
    private banroomService: BanroomService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {}

  createRoomFunction() {

    this._roomSub =   this.banroomService.newRoom()
      .subscribe( room => {
        console.log(room.id);
        this.router.navigate([room.id])
      });
    // this.router.navigate();
  }

}
