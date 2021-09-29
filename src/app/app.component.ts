import { Component, OnInit } from '@angular/core';


// @ts-ignore
window.SpeechRecognition = window?.webkitSpeechRecognition || window.SpeechRecognition;
// @ts-ignore
window.SpeechGrammarList = window?.webkitSpeechGrammarList || window.SpeechGrammarList;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {

  }
}
