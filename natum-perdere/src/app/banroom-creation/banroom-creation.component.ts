import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banroom-creation',
  templateUrl: './banroom-creation.component.html',
  styleUrls: ['./banroom-creation.component.css']
})
export class BanroomCreationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createRoomFunction() {
    alert("clicked me!");
  }

}
