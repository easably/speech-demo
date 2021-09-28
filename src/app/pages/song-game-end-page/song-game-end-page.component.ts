import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { SongHandlerService } from 'src/app/services/song-handler/song-handler.service';

@Component({
  selector: 'app-song-game-end-page',
  templateUrl: './song-game-end-page.component.html',
  styleUrls: ['./song-game-end-page.component.scss']
})
export class SongGameEndPageComponent implements OnInit {

  public right = Number(this.activatedRoute.snapshot.queryParams.right)
  public wrong = Number(this.activatedRoute.snapshot.queryParams.wrong)
  public correctList : string[] = this.activatedRoute.snapshot.queryParams.correctList
  public wrongList : string[] = this.activatedRoute.snapshot.queryParams.wrongList

  public song : Song = this.songHandler.currentSong;

  public correctPercent : number;
  public wrongPercent : number;

  public isExtended : boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private songHandler : SongHandlerService
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
    this.correctPercent = Math.ceil(this.right / sum * 100);
    this.wrongPercent = Math.floor(this.wrong / sum * 100);
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
    if(!this.isExtended) {
      this.router.navigate(["menu-page"])
    } else {
      this.isExtended = false;
    } 
  }

  viewDetails() {
    this.isExtended = true;
  }

}
