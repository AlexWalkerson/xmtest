import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Subscription, switchMap } from 'rxjs';
import { FavoriteService } from 'src/app/core/services/favorite.service';


@Component({
  selector: 'app-image-full',
  templateUrl: './image-full.component.html',
  styleUrls: ['./image-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageFullComponent implements OnInit, OnDestroy {
  id: number;
  src: string;
  private favoriteSb: Subscription;
  private reload: BehaviorSubject<unknown> = new BehaviorSubject(null);

  constructor(
    private route: ActivatedRoute,
    private readonly favoriteService: FavoriteService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.favoriteSb = combineLatest([this.route.params, this.reload]).pipe(
      switchMap(([params, e]) => {
        this.id = params['id'];
        return this.favoriteService.getFavoriteSrcById(this.id);
      })
    ).subscribe(src => {
      this.src = src;
      this.cd.detectChanges();
    });
  }

  remove() {
    this.favoriteService.remove(this.id);
    this.reload.next(null);
  }

  ngOnDestroy(): void {
    this.favoriteSb.unsubscribe();
  }
}
