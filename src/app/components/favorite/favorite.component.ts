import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit, OnDestroy {
  listPhoto: { id: number, src: string }[] = [];
  private favoriteSb: Subscription;

  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.favoriteSb = this.favoriteService.getFavoriteSrc().subscribe(src => {
      this.listPhoto = src.sort((a, b) => a.id - b.id);
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.favoriteSb.unsubscribe();
  }

  trackByFn(index: number, item: { id: number, src: string }): number {
    return item.id;
  }

}
