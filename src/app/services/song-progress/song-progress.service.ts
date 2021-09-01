import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongProgressService {
  indexArray : number[] = [];

  right: BehaviorSubject<number> = new BehaviorSubject(0);
  wrong: BehaviorSubject<number> = new BehaviorSubject(0);
  completed: BehaviorSubject<number> = new BehaviorSubject(0);
  length: BehaviorSubject<number> = new BehaviorSubject(0);
  wrongIndexes : BehaviorSubject<number[]> = new BehaviorSubject(this.indexArray);


  constructor() { }

  addRight() {
    let currentValue = this.right.getValue();
    let currentCompleted = this.completed.getValue();
    this.right.next(++currentValue);
    this.completed.next(++currentCompleted);
  }

  addWrong() {
    let currentValue = this.wrong.getValue();
    let currentCompleted = this.completed.getValue();
    this.wrong.next(++currentValue);
    this.completed.next(++currentCompleted);
  }

  resetSongProgress(newLength: number) {
    this.right.next(0);
    this.wrong.next(0);
    this.completed.next(0);
    this.length.next(newLength);
  }
}
