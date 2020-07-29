import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-banroom',
  templateUrl: './banroom.component.html',
  styleUrls: ['./banroom.component.css']
})
export class BanroomComponent implements OnInit {
  room_id = "AAAAA";
  constructor(
    private route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.room_id = params.get("ban_id")
      console.log(params.get("ban_id"));
    })

  }

}
