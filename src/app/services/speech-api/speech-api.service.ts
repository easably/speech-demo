import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpeechRecognition } from '@capacitor-community/speech-recognition-t';

@Injectable({
  providedIn: 'root'
})
export class SpeechApiService {
  speechResult: Subject<string> = new Subject;

  private word: any;
  private isEnd = false;

  constructor() {
  }
  
  init(dictionary : string) {
    console.log(dictionary)
    SpeechRecognition.init({
      dict : dictionary
    })
  }

  startSpeech(dictionary : string) {
    SpeechRecognition.start({
      language : "en-US",
      maxResults : 5,
      dict : dictionary
    }).then(result => {
      if(result.matches[0] != null && result.matches[0] != undefined) {
        console.log(JSON.parse(result.matches[0].toString()));
        let res = JSON.parse(result.matches[0].toString());
        this.speechResult.next(res.text);
      }
      else {
          this.speechResult.next('');
      }
      
    })
  }

  stopSpeech() {
    SpeechRecognition.stop()
  }

}
