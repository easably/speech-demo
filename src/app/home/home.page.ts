import { Component } from '@angular/core';
//import { SpeechRecognition } from "speech-recognition-t"; //my plugin in process
// import :  npm install ../path/to/plugin (only local, haven't publush to npm yet)
// npm uninstall plugin-name
import { SpeechRecognition } from "@capacitor-community/speech-recognition";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  text:String[];
  inputString: string = ""
  result: string = "Nothing recognized";
  inputValue: string = "";
  recognized: string = "";
  isStop: boolean = true;
  constructor() {}

  speak() {
    this.isStop = false;
    SpeechRecognition.start({
      language:"en-US",
      maxResults: 5,
    }).then((match) => {
      this.text = match.matches;
      this.printResult();
      this.stop()
    })
  }

  stop() {
    SpeechRecognition.stop()
    //this.printResult();
  }

  requestPermission() {
    SpeechRecognition.requestPermission().then((data) => {
      //alert(JSON.stringify(data));
    },(err)=> {
      alert(JSON.stringify(err));
    })
  }

  checkPermission() {
    SpeechRecognition.hasPermission().then((perm) => {
      if (perm.permission) {
        alert('already have permission');
      }
      else {
        alert('not have permission'); 
      }
    },(err) => {
      alert(JSON.stringify(err));
    })
  }

  private printResult(): void {
    let sourceText = this.inputValue; 
    this.recognized = "";
    this.inputString = sourceText;
    let mark = 0;
    let bestMark = -1;
    let bestIndex = 0;
    let index = 0;
    let marksum = 0;
    sourceText = sourceText.toLowerCase();
    this.text.forEach(element => {
      mark = 1 - this.calculateDistance(sourceText.toLowerCase(), element.toString().toLowerCase()) / Math.max(sourceText.length, element.length);
      this.recognized += `${element.toString().toLowerCase()} - ${(mark * 100).toFixed(1)} | `;
      marksum += mark
      if(mark > bestMark) {
        bestMark = mark;
        bestIndex = index;
      }
      index++;
    });
    this.result =  `recognized: ${this.text[bestIndex]} - best: ${(bestMark * 100).toFixed(1)}%
     | average: ${((marksum / this.text.length) * 100).toFixed(1)}%` +
    //  | formula: ${(((bestMark + (marksum - bestMark)/(this.text.length - 1)) / 2) * 100).toFixed(1)}%
    //  | formula2_1: ${(bestMark * 0.8 * 100 + 0.2 * (marksum - bestMark)/(this.text.length - 1) * 100).toFixed(1)}%
    //  | formula2_2: ${(bestMark * 0.7 * 100 + 0.3 * (marksum - bestMark)/(this.text.length - 1) * 100).toFixed(1)}%
    //  | formula2_3: ${(bestMark * 0.6 * 100 + 0.4 * (marksum - bestMark)/(this.text.length - 1) * 100).toFixed(1)}%
    //  | formula2_4: ${(bestMark * 0.5 * 100 + 0.5 * (marksum - bestMark)/(this.text.length - 1) * 100).toFixed(1)}%
     `| final mark = ${(bestMark * (0.8 - bestIndex * 0.1) * 100 + (1 - (bestMark * (0.8 - bestIndex * 0.1))) * (marksum - bestMark)/(this.text.length - 1) * 100).toFixed(1)}%`;
    alert(this.result);
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
