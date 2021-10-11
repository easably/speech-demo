import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { NgZone } from '@angular/core';


@Component({
  selector: 'cat-reaction',
  templateUrl: './cat-reaction.component.html',
  styleUrls: ['./cat-reaction.component.scss']
})
export class CatReactionComponent implements OnInit {
  @Input() percent = 0;

  private animationItem : AnimationItem

  options: AnimationOptions = {
    path: './assets/animations/cat.json',
    autoplay: false,
    loop: false, 
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  constructor(private ngZone: NgZone){
  }

  ngOnInit(): void {   

  }

  ngOnChanges() { //refactor
    if(this.percent == 100) {
      this.options.initialSegment = [50, 105]
    }
    else if(this.percent < 50) {
      this.options.initialSegment = [180, 200]
    }
    else {
      this.options.initialSegment = [120, 180]
    }
    setTimeout(()=> {   
      this.play()
    }, this.percent * 10 + 800)
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
