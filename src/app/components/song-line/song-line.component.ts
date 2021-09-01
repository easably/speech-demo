import { Component, Input, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'song-line',
  templateUrl: './song-line.component.html',
  styleUrls: ['./song-line.component.scss']
})
export class SongLineComponent implements OnInit {
  @Input() line: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
