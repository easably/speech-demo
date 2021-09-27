import { Component, OnInit } from '@angular/core';
import { Song, LyricsLine } from 'src/app/models/song.model';
import { Router } from '@angular/router';
import { SongHandlerService } from 'src/app/services/song-handler/song-handler.service';


@Component({
  selector: 'app-insert-song-page',
  templateUrl: './insert-song-page.component.html',
  styleUrls: ['./insert-song-page.component.scss']
})
export class InsertSongPageComponent implements OnInit {

  public songTitle : string
  public lyrics : string;

  constructor(
    private songHandler : SongHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(["menu-page"])
  }

  start() { 
    let songInfo: string[]
    try {
      songInfo = this.songTitle.split(" - ");
    } catch (e) {
      alert("Введите название песни")
    }

    let lyricsArr : string[];
    try {
      lyricsArr = this.lyrics.split(/\n\n|\r\r/g);
    } catch (e) {
      alert("Введите слова песни")
    }
    let lyricsLines : LyricsLine[] = [
      {
        text : "Hidden",
        status : null,
        state : "hidden"
      },
    ];
    lyricsArr.forEach(line => {
      lyricsLines.push(
        {
          text : line,
          status : null,
          state : "pending"
        }
      )
    });

    let song : Song = {
      artist : songInfo[0],
      title : songInfo[1],
      label : "./assets/song-icons/3.svg",
      lyrics : lyricsLines
    };

   this.songHandler.addSongToList(song)
   let songIdx = this.songHandler.songList.length - 1
   this.router.navigate(['/main-page'], {
    queryParams: {
      songIdx,
    }
  });
  }

}
