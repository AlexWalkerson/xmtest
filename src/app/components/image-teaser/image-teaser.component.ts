import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

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
    private readonly route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  save() {
    this.snackBar.open('Added to Favorite', '', {duration: 1000});
  }

  show() {
    this.router.navigate(['image', this.id], {relativeTo: this.route});
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
