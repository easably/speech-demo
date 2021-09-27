import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() wrongList: string[]; 
  @Input() correctList: string[]; 
  @Input() song: any = {};

  public lyricsLine : any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    let idx = 0;
    console.log(this.song.lyrics)
    this.song.lyrics.forEach(line => {
      console.log(line)
      if(this.correctList?.includes(idx.toString())) {
        this.lyricsLine.push({text : line.text, status : "right"})
      }
      if(this.wrongList?.includes(idx.toString())) {
        this.lyricsLine.push({text : line.text, status : "wrong"})
      }
      idx++;
    })
  }
}
