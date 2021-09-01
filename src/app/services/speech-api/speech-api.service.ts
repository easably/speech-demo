import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpeechRecognition } from '@capacitor-community/speech-recognition-t';

@Injectable({
  providedIn: 'root'
})
export class SpeechApiService {
  speechResult: Subject<string> = new Subject;

  //private recognition = new SpeechRecognition();
  private word: any;
  private isEnd = false;

  constructor() {
    // this.recognition.onresult = event => {
    //   if (!this.isEnd) {
    //     this.speechListener(event);
    //   }
    // }
    // this.recognition.onend = event => {
    //   if (!this.isEnd) {
    //     this.speechResult.next('');
    //   }
    // }
  }
  init(dictionary : string) {
    console.log(dictionary)
    SpeechRecognition.init({
      dict : dictionary
    })
  }

  startSpeech(dictionary : string) {
    console.log("called start")
    SpeechRecognition.start({
      language : "en-US",
      maxResults : 5,
      dict : dictionary
    }).then(result => {
      //this.speechResult.next(result.matches[0].toString())
      console.log("RESULT RETURNED")
      if(result.matches[0] != null && result.matches[0] != undefined) {
        console.log(JSON.parse(result.matches[0].toString()));
        let res = JSON.parse(result.matches[0].toString());
        this.speechResult.next(res.text);
      }
      else {
          this.speechResult.next('');
      }
      
    })
    // console.warn('start listerning...');
    // this.recognition.interimResults = false;
    // this.recognition.maxAlternatives = 1;
    // this.recognition.start();
    // this.isEnd = false;
  }

  stopSpeech() {
    console.log("called end")
    SpeechRecognition.stop()
    //this.speechResult.next('');
    // console.warn('listerning stoped');
    // this.recognition.stop();
    // this.isEnd = true;
    // return this.word;
  }

}
