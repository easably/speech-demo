import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Songs, Song } from 'src/app/models/song.model';
import { SongHandlerService } from 'src/app/services/song-handler/song-handler.service';

import * as SONGS from 'src/assets/songs.json';



@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  public songsContainer: Songs = SONGS;
  public songs : Song[] = this.songsContainer.songs
  public song : Song
    
  constructor(
    private router: Router,
    private songHandler : SongHandlerService   
  ) { }

  ngOnInit(): void {
  }

  goGame(songIdx : number) {
    this.song = this.songs[songIdx]
    this.router.navigate(['/main-page'], {
      queryParams: {
        songIdx,
      }
    });
  }
  insertText() {
    this.router.navigate(['insert-song-page'])
  }
}