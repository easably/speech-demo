import { Injectable } from '@angular/core';
import { Song, Songs } from 'src/app/models/song.model';
import { Storage } from '@capacitor/storage';

import * as SONGS from 'src/assets/songs.json';


@Injectable({
  providedIn: 'root'
})
export class SongHandlerService {

  private songsContainer: Songs = SONGS;

  public songList: Song[] = this.songsContainer.songs;
  public currentSong: Song;

  constructor() {
    let keys : string[];
    Storage.keys().then(keysObj => {
      keys = keysObj.keys
      keys = keys.sort((left,right) => Number(left) - Number(right))
      if(keys != null) {
        keys.forEach(key => {
          Storage.get({ key: key }).then(val => {
            console.log(JSON.parse(val.value));
            if(val.value != null) {
              this.songList.push(JSON.parse(val.value))
            }
          });
        })
      }
    })
  }

  async addSongToList(song : Song) {
    console.log(JSON.stringify(song));
    let songId = 0;
    let amountOfKeys = 0;
    Storage.keys().then(keysObj => {
      amountOfKeys = keysObj.keys.length
      songId = amountOfKeys + 1
      Storage.set({
        key: `${songId}`,
        value: JSON.stringify(song),
      });
    })
    this.songList.push(song);
  }

  setCurrentSong(idx : number) {
    this.currentSong = this.songList[idx];
  }
}
