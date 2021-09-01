import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'speech-button',
  templateUrl: './speech-button.component.html',
  styleUrls: ['./speech-button.component.scss']
})
export class SpeechButtonComponent implements OnInit {
  @Input() isActive = false;

  constructor() { }

  ngOnInit(): void {}

}
