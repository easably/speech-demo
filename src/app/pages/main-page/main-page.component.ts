import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song, Songs } from 'src/app/models/song.model';
import { SongProgressService } from 'src/app/services/song-progress/song-progress.service';
import { SpeechApiService } from 'src/app/services/speech-api/speech-api.service';

import * as SONGS from 'src/assets/songs.json';



@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public songsContainer: Songs = SONGS;
  public song : Song = this.songsContainer.songs[this.activatedRoute.snapshot.queryParams.songIdx]; //refactor

  public isListening: boolean = false;
  public dict : string = "";
  public recognizedString : string = "NULL";

  public correctList: number[] = [];
  public wrongList: number[] = [];
  public currectLine = 1;

  constructor(
    private speechApi: SpeechApiService,
    private cdRef: ChangeDetectorRef,
    private songProgressService: SongProgressService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setStartState()
    this.songProgressService.resetSongProgress(this.song.lyrics.length - 1);
    this.setDict()
    this.speechApi.speechResult.subscribe(result => {
      this.song.lyrics[1].status = "completed"
      let line = this.song.lyrics[1].text.replace(/[.,!?]/g,'').toLowerCase();
      let strWords = line.split(" ");
      line = "";
      for(let i = 0; i < strWords.length; i++) {
        if(strWords[i][0] == "\'" || strWords[i][strWords[i].length - 1] == "\'" || (strWords[i][strWords[i].length - 1] == 
          "s" && strWords[i][strWords[i].length - 2] == "\'")) {
          strWords[i] = strWords[i].replace("\'", "");
        }
        line += i + 1 != strWords.length ? strWords[i] + " ": strWords[i];
      }
      console.log(`result: ${result} ||| source: ${line}`);
      this.recognizedString = result;
      if (result === line) {
        //this.song.lyrics[1].status = 'right';
        this.correctList.push(this.currectLine)
        this.currectLine++;
        this.songProgressService.addRight();
      } else {
        //this.song.lyrics[1].status = 'wrong';
        this.wrongList.push(this.currectLine)
        this.currectLine++;
        this.songProgressService.addWrong();
      }

      setTimeout(() => { //need to change logic
        this.song.lyrics[1].status = null;
        this.song.lyrics[1].state = "pending";
        this.song.lyrics.shift();
        if(this.song.lyrics.length > 1) {
          this.song.lyrics[1].state = "current";
          this.cdRef.detectChanges();
        } else {
          let right = this.songProgressService.right.getValue();
          let wrong = this.songProgressService.wrong.getValue();
          let songIdx = this.activatedRoute.snapshot.queryParams.songIdx;
          let correctList = this.correctList
          let wrongList = this.wrongList;
          this.router.navigate(['/game-end-page'], {
            queryParams: {
              right,
              wrong,
              songIdx,
              correctList,
              wrongList
            }
          });
        }
      }, 1000);
      this.cdRef.detectChanges();
      this.isListening = false;
    });
  }

  setStartState() {
    
    if(this.song.lyrics.length > 1) {
      this.song.lyrics[1].state = "current";
    }
    else {
      this.reloadAll()
    }
  }

  startSpeech() {
    console.log("speech listening STARTED")
    if(!this.isListening) {
      this.speechApi.startSpeech(this.dict);
      this.isListening = true;
    }
  }

  stopSpeech() {
    console.log("speech listening FINISHED")
    this.speechApi.stopSpeech()
    this.isListening = false;
  }

  reloadAll() {
    window.location.reload()
  }

  goBack() {
    this.song.lyrics.length = 0 // убрать костыль
    this.router.navigate(["menu-page"])
  }


  private setDict() { // Need to be refactored!
    console.log(this.activatedRoute.snapshot.queryParamMap)
    let set = new Set();
    this.song.lyrics.forEach(line => {
      let str = line.text.replace(/[.,!?]/g,'').toLowerCase();
      let strWords = str.split(" ");
      str = "";
      for(let i = 0; i < strWords.length; i++) {
        if(strWords[i][0] == "\'" || strWords[i][strWords[i].length - 1] == "\'" || (strWords[i][strWords[i].length - 1] == 
          "s" && strWords[i][strWords[i].length - 2] == "\'")) { // change
          strWords[i] = strWords[i].replace("\'", "");
        }
        str += i + 1 != strWords.length ? strWords[i] + " ": strWords[i];
      }
      set.add(str);
    }); 
    set.forEach(element => {
      this.dict += element + "@ ";
    });
    console.log(this.dict);
  }
}
