import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-song-game-end-page',
  templateUrl: './song-game-end-page.component.html',
  styleUrls: ['./song-game-end-page.component.scss']
})
export class SongGameEndPageComponent implements OnInit {

  public right = this.activatedRoute.snapshot.queryParams.right
  public wrong = this.activatedRoute.snapshot.queryParams.wrong

  public correctPercent : string = "";
  public wrongPercent : string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.calculateStats()
    this.debug()
  }

  debug() {
    console.log(this.activatedRoute.snapshot.queryParams.wrongList)
    console.log(this.activatedRoute.snapshot.queryParams.correctList)
  }

  calculateStats() {
    let sum = Number(this.right) + Number(this.wrong);
    console.log(sum)
    this.correctPercent = (this.right / sum * 100).toFixed(1);
    this.wrongPercent = (this.wrong / sum * 100).toFixed(1);
  }

  tryAgainSong() {
    let songIdx = this.activatedRoute.snapshot.queryParams.songIdx;
    this.router.navigate(['/main-page'], {
      queryParams: {
        songIdx
      }
    });
  }

  backToMenu() {
    this.router.navigate(["menu-page"])
  }

  viewDetails() {
    let correctList = this.activatedRoute.snapshot.queryParams.correctList
    let wrongList = this.activatedRoute.snapshot.queryParams.wrongList
    let songIdx = this.activatedRoute.snapshot.queryParams.songIdx;
    console.log(correctList)
    console.log(wrongList)
    this.router.navigate(["lyrics-stats-page"],  {
      queryParams: {
        songIdx,
        correctList,
        wrongList
      }
    });
  }

}
