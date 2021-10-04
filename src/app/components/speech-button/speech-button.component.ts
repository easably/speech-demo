import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { NgZone } from '@angular/core';


@Component({
  selector: 'speech-button',
  templateUrl: './speech-button.component.html',
  styleUrls: ['./speech-button.component.scss']
})
export class SpeechButtonComponent implements OnInit {
  @Input() isActive = false;

  private animationItem : AnimationItem

  options: AnimationOptions = {
    path: './assets/animations/micro.json',
    autoplay: false 
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  constructor(private ngZone: NgZone){
  }

  ngOnInit(): void {
  }

  ngOnChanges() { //refactor
    if(this.isActive) {
      this.play();
    } else {
      this.stop();
    }
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem?.stop();
    });
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem?.play();
    });
  }
}
