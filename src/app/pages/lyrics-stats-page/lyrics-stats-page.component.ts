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
    if(this.song.lyrics.length < 2) {
      window.location.reload();
      return;
    }
    let correctList : string[] = this.activatedRoute.snapshot.queryParams.correctList;
    let wrongList : string[] = this.activatedRoute.snapshot.queryParams.wrongList
    console.log(wrongList)
    let idx = 0;
    console.log(this.song.lyrics)
    this.song.lyrics.forEach(line => {
      console.log(line)
      if(correctList?.includes(idx.toString())) {
        this.lyricsLine.push({text : line.text, status : "right"})
      }
      if(wrongList?.includes(idx.toString())) {
        this.lyricsLine.push({text : line.text, status : "wrong"})
      }
      idx++;
    })
    
    console.log(this.lyricsLine)
  }

  backToStats() {
    window.history.back()
  }

}
