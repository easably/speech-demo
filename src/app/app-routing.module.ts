import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LyricsStatsPageComponent } from './pages/lyrics-stats-page/lyrics-stats-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { SongGameEndPageComponent } from './pages/song-game-end-page/song-game-end-page.component';

const routes: Routes = [
  {
    path: 'menu-page',
    component: MenuPageComponent
  },
  {
    path: '',
    redirectTo: '/menu-page',
    pathMatch: 'full'
  },
  {
    path: 'game-end-page',
    component: SongGameEndPageComponent
  },
  {
    path: 'main-page',
    component: MainPageComponent
  },
  {
    path: 'lyrics-stats-page',
    component: LyricsStatsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
