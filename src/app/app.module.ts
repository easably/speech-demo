import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScoreComponent } from './components/score/score.component';
import { SongTitleComponent } from './components/song-title/song-title.component';
import { SpeechButtonComponent } from './components/speech-button/speech-button.component';
import { SongProgressComponent } from './components/song-progress/song-progress.component';
import { SongLineComponent } from './components/song-line/song-line.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { SongGameEndPageComponent } from './pages/song-game-end-page/song-game-end-page.component';
import { StatsComponent } from './components/stats/stats.component';
import { InsertSongPageComponent } from './pages/insert-song-page/insert-song-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ScoreComponent,
    SongTitleComponent,
    SpeechButtonComponent,
    SongProgressComponent,
    SongLineComponent,
    MenuPageComponent,
    SongGameEndPageComponent,
    StatsComponent,
    InsertSongPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
