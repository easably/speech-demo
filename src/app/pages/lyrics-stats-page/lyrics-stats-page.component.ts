import { Component, OnInit } from '@angular/core';

import { Song, Songs } from 'src/app/models/song.model';
import { ActivatedRoute, Router } from '@angular/router';


import * as SONGS from 'src/assets/songs.json';

@Component({
  selector: 'app-lyrics-stats-page',
  templateUrl: './lyrics-stats-page.component.html',
  styleUrls: ['./lyrics-stats-page.component.scss']
})
export class LyricsStatsPageComponent implements OnInit {

  public songsContainer: Songs = SONGS;
  public song : Song = this.songsContainer.songs[this.activatedRoute.snapshot.queryParams.songIdx];
  public lyricsLine : any[] = []

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.debug()
  }

  debug() {
    let correctList : string[] = this.activatedRoute.snapshot.queryParams.correctList;
    let wrongList : string[] = this.activatedRoute.snapshot.queryParams.wrongList
    console.log(wrongList)
    // console.log(wrongList.includes("2"))
    let idx = 1;
    console.log(this.song.lyrics)
    this.song.lyrics.forEach(line => {
      if(correctList?.includes(idx.toString())) {
        this.lyricsLine.push({text : line.text, status : "correct"})
      }
      if(wrongList?.includes(idx.toString())) {
        this.lyricsLine.push({text : line.text, status : "wrong"})
      }
      idx++;
    })
    
    console.log(this.lyricsLine)
  }

  back() {
    window.history.back()
  }

}
