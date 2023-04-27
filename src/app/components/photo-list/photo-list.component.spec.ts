import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { jest } from '@jest/globals';
import { Subject } from 'rxjs';
import { PhotoService } from '../../core/services/photo.service';

import { PhotoListComponent } from './photo-list.component';

describe('HomeComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoServiceMock: Partial<PhotoService>;
  let getTeaserPhotoListSubject: Subject<any>;
  let getTeaserPhotoSrcSubject: Subject<any>;

  beforeEach(async () => {
    getTeaserPhotoListSubject = new Subject();
    getTeaserPhotoSrcSubject = new Subject();

    photoServiceMock = {
      getTeaserPhotoList: jest.fn(() => getTeaserPhotoListSubject.asObservable()),
      getTeaserPhotoSrc: jest.fn(() => getTeaserPhotoSrcSubject.asObservable()),
    };

    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [PhotoListComponent],
      providers: [{provide: PhotoService, useValue: photoServiceMock}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    getTeaserPhotoListSubject.complete();
    getTeaserPhotoSrcSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more images on init', () => {
    getTeaserPhotoListSubject.next([1, 2, 3]);
    getTeaserPhotoSrcSubject.next(['src1', 'src2', 'src3']);

    expect(component.srcList).toEqual(['src1', 'src2', 'src3']);
    expect(photoServiceMock.getTeaserPhotoList).toHaveBeenCalled();
    expect(photoServiceMock.getTeaserPhotoSrc).toHaveBeenCalledWith([0, 1, 2]);
  });

  it('should load more images on loadMore', () => {
    component['loaded'] = false;
    component['loadMoreSbj'].next(null);

    getTeaserPhotoListSubject.next([1, 2, 3]);
    getTeaserPhotoSrcSubject.next(['src1', 'src2', 'src3']);

    expect(component.srcList).toEqual([  "src1", "src2", "src3", "src1", "src2", "src3"]);
    expect(photoServiceMock.getTeaserPhotoList).toHaveBeenCalled();
  });

  describe('getBatchIds', () => {
    it('should return an array of numbers starting from lastLoadedImageIndex and containing up to loadImagesNumber items when lastIndex is greater than lastLoadedImageIndex + loadImagesNumber', () => {
      component['lastLoadedImageIndex'] = 3;
      component['lastIndex'] = 10;
      component['loadImagesNumber'] = 5;
      const expectedIds = [3, 4, 5, 6, 7];

      const result = component.getBatchIds();

      expect(result).toEqual(expectedIds);
    });

    it('should return an array of numbers starting from lastLoadedImageIndex and containing up to lastIndex - lastLoadedImageIndex + 1 items when lastIndex is less than or equal to lastLoadedImageIndex + loadImagesNumber', () => {
      component['lastLoadedImageIndex'] = 3;
      component['lastIndex'] = 6;
      component['loadImagesNumber'] = 5;
      const expectedIds = [3, 4, 5, 6];

      const result = component.getBatchIds();

      expect(result).toEqual(expectedIds);
    });

    it('should set loaded to true when lastIndex is less than or equal to lastLoadedImageIndex + loadImagesNumber', () => {
      component['lastLoadedImageIndex'] = 3;
      component['lastIndex'] = 6;
      component['loadImagesNumber'] = 5;

      component.getBatchIds();

      expect(component['loaded']).toBe(true);
    });
  });

  describe('createIndexRange', () => {
    it('should return an array of numbers starting from start and containing count items', () => {
      const start = 5;
      const count = 3;
      const expectedIds = [5, 6, 7];

      const result = component.createIndexRange(start, count);

      expect(result).toEqual(expectedIds);
    });
  });

});
