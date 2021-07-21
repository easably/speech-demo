import { Component } from '@angular/core';
//import { SpeechRecognition } from "speech-recognition-t"; //my plugin in process
// import :  npm install ../path/to/plugin (only local, haven't publush to npm yet)
// npm uninstall plugin-name
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

// TODO: code refactor
// TODO: plugin refactor
// TODO: remove unnesesary logs
enum TextMark {
  Excellent,
  Good,
  Sad
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage{
  textMark = TextMark; 
  
  text:String[];
  inputString: string = ""
  result: string = "Nothing recognized";
  inputValue: string = "";
  recognized: string = "";

  isStop: boolean = true;
  isPulse: boolean = false;

  textMarkValue = TextMark.Good;

  mark: number = 0;

  constructor() {}


  async speak() {
    this.isStop = false;
    await this.checkPermission();
    let isAvailable = await this.isSpeechRecognitionAvailable();
    console.log(isAvailable);
    if(isAvailable) {
      this.isPulse = true;
      await SpeechRecognition.start({
        language:"en-US",
        maxResults: 5, 
      }).then((match) => {
        console.log(match);
        this.text = match.matches;
        this.stop();
      }, err => {
        console.log(err);
        this.text = [""];
        this.stop();
      })
    }
    else {
      alert("Speech recognition is not available on this device");
    }
  }

  stop() {
    this.isPulse = false;
    SpeechRecognition.stop()
    this.printResult();
  }

  private async isSpeechRecognitionAvailable() : Promise<boolean> {
    let isAvailable;
    await SpeechRecognition.available().then((acces) => {
      isAvailable = acces.available
    })
    return isAvailable;
  }


  private async requestPermission() {
    await SpeechRecognition.requestPermission().then((data) => {
      console.log("permission granted");
    },(err)=> {
      alert(JSON.stringify(err));
    })
  }

  private async checkPermission() {
    await SpeechRecognition.hasPermission().then((perm) => {
      if (perm.permission) {
        console.log('already have permission');
      }
      else {
        this.requestPermission()
      }
    },(err) => {
      alert(JSON.stringify(err));
    })
  }

  private showMark() : void {
    console.log(this.mark)
    if(this.mark > 80) {
      this.textMarkValue = TextMark.Excellent; 
    }
    else if(this.mark < 50) {
      this.textMarkValue = TextMark.Sad; 
    }
    else {
      this.textMarkValue = TextMark.Good; 
    }
    
  }

  private printResult(): void { //Print mark calculated usign Damerau-Levensthtein distance and list of results
    let sourceText = this.inputValue; 
    this.recognized = "";
    this.inputString = sourceText;
    let elemMark = 0;
    let bestMark = 0;
    let bestIndex = 0;
    let index = 0;
    let marksum = 0;
    sourceText = sourceText.toLowerCase();
    this.text.forEach(element => {
      elemMark = 1 - this.calculateDistance(sourceText.toLowerCase(), element.toString().toLowerCase()) / Math.max(sourceText.length, element.length);
      this.recognized += `${element.toString().toLowerCase()} - ${(elemMark * 100).toFixed(1)} | `;
      marksum += elemMark
      if(elemMark > bestMark) {
        bestMark = elemMark;
        bestIndex = index;
      }
      index++;
    });
    if (this.text.length != 1) {
      this.mark = (bestMark * (0.8 - bestIndex * 0.1) +  (bestMark * (0.2 + bestIndex * 0.1)) * (marksum - bestMark)/(this.text.length - 1))
      this.mark *= 100;
      console.log("mark!!!!" +  this.mark);
      this.result =  `recognized: ${this.text[bestIndex].toLowerCase()} | mark = ${this.mark.toFixed(1)}%`;
    } else {
      this.mark = bestMark  * 100
      this.result = `recognized: ${this.text[0]} | mark ${(bestMark*100).toFixed(1)}%`;
    }
    this.showMark()
    this.isStop = true;
  }

  private calculateDistance(source:string, target:string): number { //method to calculate mark(Damerau-Levensthtein distance)
    if (!source) return target ? target.length : 0;
    else if (!target) return source.length;
    var m = source.length, n = target.length, INF = m+n, score = new Array(m+2), sd = {};
    for (var i = 0; i < m+2; i++) score[i] = new Array(n+2);
    score[0][0] = INF;
    for (var i = 0; i <= m; i++) {
        score[i+1][1] = i;
        score[i+1][0] = INF;
        sd[source[i]] = 0;
    }
    for (var j = 0; j <= n; j++) {
        score[1][j+1] = j;
        score[0][j+1] = INF;
        sd[target[j]] = 0;
    }
    for (var i = 1; i <= m; i++) {
        var DB = 0;
        for (var j = 1; j <= n; j++) {
            var i1 = sd[target[j-1]],
                j1 = DB;
            if (source[i-1] === target[j-1]) {
                score[i+1][j+1] = score[i][j];
                DB = j;
            }
            else {
                score[i+1][j+1] = Math.min(score[i][j], Math.min(score[i+1][j], score[i][j+1])) + 1;
            }
            score[i+1][j+1] = Math.min(score[i+1][j+1], score[i1] ? score[i1][j1] + (i-i1-1) + 1 + (j-j1-1) : Infinity);
        }
        sd[source[i-1]] = i;
    }
    return score[m+1][n+1];
  }


}
