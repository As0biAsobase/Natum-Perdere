import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  memes = [
    "И всё-таки он вертится!",
    "кекв",
    "Хэ-хэ-хэ",
    "Теперь банановый!"
  ];

  randomPhrase: string;
  constructor() { }

  ngOnInit(): void {
    this.randomPhrase = this.memes[Math.floor(Math.random() * this.memes.length)];
  }

}
