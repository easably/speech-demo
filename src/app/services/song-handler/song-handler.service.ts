import { Injectable } from '@angular/core';
import { Song, Songs } from 'src/app/models/song.model';

import * as SONGS from 'src/assets/songs.json';


@Injectable({
  providedIn: 'root'
})
export class SongHandlerService {

  private songsContainer: Songs = SONGS;

  public songList: Song[] = this.songsContainer.songs;
  public currentSong: Song;

  constructor() {}

  addSongToList(song : Song) {

    this.songList.push(song)
  }

  setCurrentSong(idx : number) {
    this.currentSong = this.songList[idx];
  }
}
