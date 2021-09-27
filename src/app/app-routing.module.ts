import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { SongGameEndPageComponent } from './pages/song-game-end-page/song-game-end-page.component';
import { InsertSongPageComponent } from './pages/insert-song-page/insert-song-page.component';

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
    path: 'insert-song-page',
    component: InsertSongPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
