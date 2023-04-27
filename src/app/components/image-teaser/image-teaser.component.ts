import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteService } from '@app/core/services/favorite.service';


@Component({
  selector: 'app-image-teaser',
  templateUrl: './image-teaser.component.html',
  styleUrls: ['./image-teaser.component.scss']
})
export class ImageTeaserComponent {

  @Input() src: string = null;
  @Input() id: number = null;
  @Input() mode: 'save' | 'link' = 'link';

  constructor(
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly favoriteService: FavoriteService
  ) {}

  save() {
    this.favoriteService.add(this.id);
    this.snackBar.open('Added to Favorite', '', {duration: 1000});
  }

  show() {
    this.router.navigate(['image', this.id]);
  }

  clickOnPhoto(event: MouseEvent) {
    event.preventDefault();

    switch (this.mode) {
      case 'save':
        return this.save();
      case 'link':
        return this.show();
    }
  }
}
