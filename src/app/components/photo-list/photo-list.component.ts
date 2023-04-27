import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from '../../core/services/photo.service';
import { InfiniteScrollDirective } from '../../share/directives/infinite-scroll.directive';
import { mergeMap, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent implements OnInit, OnDestroy {

  @ViewChild(InfiniteScrollDirective) infiniteScrollDirective!: InfiniteScrollDirective;

  loading = false;
  srcList: string[] = [];

  private loadImagesNumber = 8;
  private lastLoadedImageIndex: number = 0;
  private lastIndex: number;
  private loaded = false;
  private photoSubscriber: Subscription;
  private loadMoreSbj: Subject<unknown> = new Subject();

  constructor(
    private readonly photoService: PhotoService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.photoSubscriber = this.loadMoreSbj.pipe(
      tap(e => this.loading = true),
      mergeMap(e => this.photoService.getTeaserPhotoList()),
      mergeMap(list => {
        this.lastIndex = list.length - 1;
        let ids = this.getBatchIds();
        return this.photoService.getTeaserPhotoSrc(ids);
      })
    ).subscribe(e => {
      this.srcList = [...this.srcList, ...e];
      this.loading = false;
      this.cd.detectChanges();
      this.infiniteScrollDirective.onScroll(null);
    });

    this.loadMore();
  }

  ngOnDestroy() {
    this.photoSubscriber.unsubscribe();
  }

  loadMore() {
    if ( !this.loaded) {
      this.loadMoreSbj.next(null);
    }
  }

  getBatchIds(): number[] {
    let ids: number[];
    if (this.lastIndex < ( this.lastLoadedImageIndex + this.loadImagesNumber )) {
      ids = this.createIndexRange(this.lastLoadedImageIndex, ( ( this.lastIndex - this.lastLoadedImageIndex ) + 1 ));
      this.loaded = true;
    } else {
      ids = this.createIndexRange(this.lastLoadedImageIndex, this.loadImagesNumber);
    }
    this.lastLoadedImageIndex = ids[ids.length - 1] + 1;

    return ids;
  }

  createIndexRange(start: number, count: number): number[] {
    return Array.from({length: count}, (_, i) => start + i);
  }

}
