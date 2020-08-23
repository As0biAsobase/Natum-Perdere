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
  constructor(
    private banroomService: BanroomService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {}

  createRoomFunction() {
    this.banroomService.newRoom();
    // this.router.navigate();
  }

}
