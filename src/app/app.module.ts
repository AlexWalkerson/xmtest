import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ImageFullComponent } from './components/image-full/image-full.component';
import { ImageTeaserComponent } from './components/image-teaser/image-teaser.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    FavoriteComponent,
    ImageTeaserComponent,
    ImageFullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
