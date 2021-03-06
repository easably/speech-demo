import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress: number;
  @Input() total: number;

  public calculatedLength;
  color: string;
  constructor() { }
  ngOnInit() {
    //if we don't have progress, set it to 0.
    if (!this.progress) {
      this.progress = 0;
    }
    //if we don't have a total aka no requirement, it's 100%.
    if (this.total === 0) {
      this.total = this.progress;
    } else if (!this.total) {
      this.total = 100;
    }
    //if the progress is greater than the total, it's also 100%.
    if (this.progress > this.total) {
      this.progress = 100;
      this.total = 100;
    }
    this.calculatedLength = (this.progress / this.total) * 100;
  }

  ngOnChanges() {
    if(this.progress <= this.total) {
      this.calculatedLength = (this.progress / this.total) * 100;
    }
  }
}
