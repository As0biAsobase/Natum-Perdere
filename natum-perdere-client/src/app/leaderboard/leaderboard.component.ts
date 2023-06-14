import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  players;

  showingRu = false;

  ruPlayers = [];
  previousPlayers = [];
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get("https://www.perdere.ru:4444/api/v1/get_leaderboard")
      .subscribe(data => {
        this.players = data["players"];
      });
  }

  showRu() {
    if (this.showingRu == false) {
      if (this.ruPlayers.length === 0) {
        var ruPlayersPromise = new Promise((resolve, reject) => {
          this.players.forEach((item, index, array) => {
            this.httpClient.get("https://www.perdere.ru:4444/api/v1/check_ru?name="+ item.name)
              .subscribe(data => {
                if (data["isRu"]) {
                  this.ruPlayers.push(item);
                }
              });
            if (index === array.length - 1) {
              resolve();
            }
          });
        });
        ruPlayersPromise.then(() => {
          this.ruPlayers.sort((a, b) => (a.rank, b.rank) ? 1 : -1);

          this.showingRu = true;
          this.previousPlayers = this.players;
          this.players = this.ruPlayers;
        });
      } else {
        this.showingRu = true;
        this.previousPlayers = this.players;
        this.players = this.ruPlayers;
      }
    } else {
      this.players = this.previousPlayers;
      this.showingRu = false;
    }
  }
}
