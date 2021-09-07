import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { SongGameEndPageComponent } from './pages/song-game-end-page/song-game-end-page.component';

const routes: Routes = [
  {
    path: 'main',
    component: MenuPageComponent
  },
  {
    path: '',
    redirectTo: '/main',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
