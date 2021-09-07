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


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
  }

  log() {
    
  }

}
