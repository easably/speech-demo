import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { SongProgressService } from 'src/app/services/song-progress/song-progress.service';
import { SongHandlerService } from 'src/app/services/song-handler/song-handler.service';
import { SpeechApiService } from 'src/app/services/speech-api/speech-api.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('currentLine', [
      state('initial', style({ height: '*' })),
      state('expanded', style({ height: 0, fontSize: '16px' })),
      transition('initial => expanded', animate('0.25s')),
    ]),
    trigger('completedLine', [
      state('initial', style({ opacity: 1 })),
      state('expanded', style({ opacity: 0 })),
      transition('initial => expanded', animate('0.25s')),
    ]),
    trigger('preparedLine', [
      state('initial', style({ })),
      state('expanded', style({ fontSize: '26px', height: '88px' })),
      transition('initial => expanded', animate('0.25s')),
    ]),
  ],
})
export class MainPageComponent implements OnInit {

  isLineChanging = false;
  currentLineState: string = 'initial'
  completedLineState: string = 'initial'
  preparedLineState: string = 'initial'

  public song: Song;
  public songLength: number;

  public isListening: boolean = false;
  public dict: string = "";
  public recognizedString: string = "NULL";

  public isGameEnded = false;

  public correctList: number[] = [];
  public wrongList: number[] = [];
  public currentLine = 1;

  constructor(
    private speechApi: SpeechApiService,
    private cdRef: ChangeDetectorRef,
    private songProgressService: SongProgressService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private songHandler: SongHandlerService
  ) { }

  ngOnInit(): void {
    this.setStartState()
    this.songProgressService.resetSongProgress(this.song.lyrics.length - 1);
    this.setDict()

    this.speechApi.speechResult.subscribe(result => {
      if (!this.isGameEnded) {
        this.analyzeResult(result);
      }
    });
  }

  private setStartState() {
    this.songHandler.setCurrentSong(this.activatedRoute.snapshot.queryParams.songIdx);
    this.song = JSON.parse(JSON.stringify(this.songHandler.currentSong));
    this.songLength = this.song.lyrics.length;
    this.song.lyrics[0].state = "completed";
    this.song.lyrics[1].state = "current";
    if(this.song.lyrics.length > 2) {
      this.song.lyrics[2].state = "prepared";
    }
  }

  startSpeech() {
    if (!this.isListening) {
      this.speechApi.startSpeech(this.dict);
      this.isListening = true;
    }
  }

  stopSpeech() {
    this.speechApi.stopSpeech()
    this.isListening = false;
  }

  goBack() {
    this.isGameEnded = true;
    this.router.navigate(["menu-page"])
  }


  private setDict() {
    let set = new Set();
    this.song.lyrics.forEach(line => {
      let str = line.text.replace(/[.,!?]/g, '').toLowerCase();
      let strWords = str.split(" ");
      str = "";
      for (let i = 0; i < strWords.length; i++) {
        if (strWords[i][0] == "\'" || strWords[i][strWords[i].length - 1] == "\'" || (strWords[i][strWords[i].length - 1] ==
          "s" && strWords[i][strWords[i].length - 2] == "\'")) {
          strWords[i] = strWords[i].replace("\'", "");
        }
        str += i + 1 != strWords.length ? strWords[i] + " " : strWords[i];
      }
      set.add(str);
    });
    set.forEach(element => {
      this.dict += element + "@ ";
    });
  }


  private analyzeResult(result: string) {
    this.song.lyrics[1].status = "completed"
    let line = this.song.lyrics[1].text.replace(/[.,!?]/g, '').toLowerCase();
    let strWords = line.split(" ");
    line = "";
    for (let i = 0; i < strWords.length; i++) {
      if (strWords[i][0] == "\'" || strWords[i][strWords[i].length - 1] == "\'" || (strWords[i][strWords[i].length - 1] ==
        "s" && strWords[i][strWords[i].length - 2] == "\'")) {
        strWords[i] = strWords[i].replace("\'", "");
      }
      line += i + 1 != strWords.length ? strWords[i] + " " : strWords[i];
    }
    this.recognizedString = result;
    if (result === line) {
      //this.song.lyrics[1].status = 'right';
      this.correctList.push(this.currentLine)
      this.currentLine++;
      this.songProgressService.addRight();
    } else {
      //this.song.lyrics[1].status = 'wrong';
      this.wrongList.push(this.currentLine)
      this.currentLine++;
      this.songProgressService.addWrong();
    }

    setTimeout(() => {
      // this.song.lyrics[1].status = null;
      this.changeLine();
    }, 500);

    this.cdRef.detectChanges();
    this.isListening = false;
  }

  private changeLine() {
    this.currentLineState = 'expanded'
    this.completedLineState = 'expanded'
    this.preparedLineState = 'expanded'
    setTimeout(() => {
      this.song.lyrics.shift();
      if (this.song.lyrics.length > 1) {
        this.song.lyrics[0].state = "completed";
        this.song.lyrics[1].state = "current";
        this.currentLineState = 'initial'
        this.completedLineState = 'initial'
        this.preparedLineState = 'initial'
        if (this.song.lyrics.length > 2) {
          this.song.lyrics[2].state = "prepared";
        }

        // this.cdRef.detectChanges();
      }
      else {
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
        this.isGameEnded = true;
      }
    }, 210)
  }
}
