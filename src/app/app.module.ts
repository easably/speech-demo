import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SongTitleComponent } from './components/song-title/song-title.component';
import { SpeechButtonComponent } from './components/speech-button/speech-button.component';
import { SongLineComponent } from './components/song-line/song-line.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { SongGameEndPageComponent } from './pages/song-game-end-page/song-game-end-page.component';
import { StatsComponent } from './components/stats/stats.component';
import { InsertSongPageComponent } from './pages/insert-song-page/insert-song-page.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CatReactionComponent } from './components/cat-reaction/cat-reaction.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() { // add this line
  return player // add this line
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SongTitleComponent,
    SpeechButtonComponent,
    SongLineComponent,
    MenuPageComponent,
    SongGameEndPageComponent,
    StatsComponent,
    InsertSongPageComponent,
    ProgressBarComponent,
    CatReactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot({
      
    }),
    LottieModule.forRoot({ player: playerFactory }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
