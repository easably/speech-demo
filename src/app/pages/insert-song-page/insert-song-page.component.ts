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

  public songTitle: string
  public lyrics: string;

  public currentLength: number;

  constructor(
    private songHandler: SongHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(["menu-page"])
  }

  start() { //refactor : разбить на функции

    let songInfo: string[]
    let lyricsArr: string[];

    //song title checker
    try {
      songInfo = this.songTitle.split(" - ");
    } catch (e) {
      alert("Введите название песни") // придумать действие
      return;
    }
    if (this.songTitle.length > 40) {
      alert("Название песни должно быть не больше 40 символов")
      return;
    }

    if(this.lyrics.replace(/\n|\r/g, "").length == 0) {
      alert("Введите слова песни")
      return;
    }

    //full lyrics validity checker
    try {
      lyricsArr = this.lyrics.split(/\n\n|\r\r/g);
    } catch (e) {
      alert("Введите слова песни") //придумать действие
      return;
    }
    console.log(lyricsArr);

    //line lengths checker
    let wordLengthMax = 0;
    let maxLineLength = 0;
    lyricsArr.forEach(line => {
      let lineWordsCounter = 0;
      line.replace(/\n|\r/g, " ").split(" ").forEach(word => {
        lineWordsCounter++;
        if(word.trim().length > wordLengthMax) {
          wordLengthMax = word.trim().length;
        }
      });
      if(lineWordsCounter > maxLineLength) {
        maxLineLength = lineWordsCounter;
      }
    });

    if(wordLengthMax > 20) {
      alert("Максимальная длинна cлова не должна быть больше 20 символов")
      return;
    }

    if(maxLineLength > 10) {
      alert("Максимальная длинна cтроки не должна быть больше 10 слов")
      return;
    }

    //construct new song
    let lyricsLines: LyricsLine[] = [
      {
        text: "",
        status: null,
        state: "pending"
      },
    ];
    lyricsArr.forEach(line => {
      if (line.trim().length && line.length != 0) {
        lyricsLines.push(
          {
            text: line.trim(),
            status: null,
            state: "pending"
          }
        )
        console.log(lyricsLines)
      }

    });

    let song: Song = {
      artist: songInfo[0],
      title: songInfo[1],
      label: "./assets/song-icons/3.svg",
      lyrics: lyricsLines
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
