import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout/layout.component';
import { HomeComponent } from '@app/components/home/home.component';
import { FavoriteComponent } from '@app/components/favorite/favorite.component';
import { ImageFullComponent } from '@app/components/image-full/image-full.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'image' + '/:id', component: ImageFullComponent },
    ]
  },

  // Not found
  {path: '**', redirectTo: ''}
];
