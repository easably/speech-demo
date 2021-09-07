import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Songs, Song } from 'src/app/models/song.model';
import * as SONGS from 'src/assets/songs.json';



@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
    public songsContainer: Songs = SONGS;
    public songs : Song[] = this.songsContainer.songs
  constructor(
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    
  }

  goGame(songIdx : number) {
    this.router.navigate(['/main-page'], {
      queryParams: {
        songIdx
      }
    });
  }
}