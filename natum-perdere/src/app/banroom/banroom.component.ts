import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banroom',
  templateUrl: './banroom.component.html',
  styleUrls: ['./banroom.component.css']
})
export class BanroomComponent implements OnInit {
  room_id = "AAAAA";
  user_id: string;
  creator: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private readonly router: Router
  ) {
    this.http.get('/api/v1/generate_uid').subscribe((data:any) => {
      console.log(data);
      this.user_id = data.guid;
      this.creator = data.creator;
    }, error => {
      console.log("There was an error generating proper GUID on the server", error);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.room_id = params.get("ban_id")
      console.log(params.get("ban_id"));
    })

  }

}
