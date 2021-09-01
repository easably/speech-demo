import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongProgressService } from 'src/app/services/song-progress/song-progress.service';

@Component({
  selector: 'song-progress',
  templateUrl: './song-progress.component.html',
  styleUrls: ['./song-progress.component.scss']
})
export class SongProgressComponent implements OnInit, OnDestroy {
  right = 0;
  wrong = 0;
  completed = 0;
  length = 0;

  private rightSubscription: Subscription;
  private wrongSubscription: Subscription;
  private completedSubscription: Subscription;
  private lengthSubscription: Subscription;

  constructor(
    private songProgressService: SongProgressService
  ) {
    this.rightSubscription = songProgressService.right.subscribe(value => this.right = value);
    this.wrongSubscription = songProgressService.wrong.subscribe(value => this.wrong = value);
    this.completedSubscription = songProgressService.completed.subscribe(value => this.completed = value);
    this.lengthSubscription = songProgressService.length.subscribe(value => this.length = value);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.rightSubscription.unsubscribe();
    this.wrongSubscription.unsubscribe();
    this.completedSubscription.unsubscribe();
    this.lengthSubscription.unsubscribe();
  }
}
