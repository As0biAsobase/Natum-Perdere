import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banroom-creation',
  templateUrl: './banroom-creation.component.html',
  styleUrls: ['./banroom-creation.component.css']
})
export class BanroomCreationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  createRoomFunction() {
    this.http.get('/api/v1/create_room').subscribe((data:any) => {
      console.log(data);
    }, error => {
      console.log("There was an error generating proper GUID on the server", error);
    });
  }

}
