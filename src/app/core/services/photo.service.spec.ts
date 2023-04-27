import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { delay, of } from 'rxjs';
import { IPhoto } from 'src/app/core/models/IPhoto';
import { PhotoHttpService } from './photo-http.service';

import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let photoHttpMock: PhotoHttpService;
  let httpMock: HttpTestingController;

  const mockPhotoList: IPhoto[] = [
    {original: 'original.jpg', small: 'small.jpg'},
    {original: 'original2.jpg', small: 'small2.jpg'},
    {original: 'original3.jpg', small: 'small3.jpg'},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PhotoService, {provide: PhotoHttpService, useValue: {getPhotoList: jest.fn(() => of(mockPhotoList))}}
      ],
    });
    service = TestBed.inject(PhotoService);
    photoHttpMock = TestBed.inject(PhotoHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getOriginalPhotoSrc', () => {
    it('should return the original photo URLs for given ids', (done) => {
      const ids = [0, 1, 2];
      const photoList = [
        { original: 'photo1.jpg', small: 'photo1_small.jpg' },
        { original: 'photo2.jpg', small: 'photo2_small.jpg' },
        { original: 'photo3.jpg', small: 'photo3_small.jpg' },
      ];
      const expectedUrls = ids.map((id) => `/assets/images-output/${photoList[id].original}`);
      jest.spyOn(photoHttpMock, 'getPhotoList').mockReturnValueOnce(of(photoList).pipe(delay(1000)));

      service.getOriginalPhotoSrc(ids).subscribe((result) => {
        expect(result).toEqual(expectedUrls);
        done();
      });
    });
  });

  describe('getTeaserPhotoSrc', () => {
    it('should return the teaser photo URLs for given ids', (done) => {
      const ids = [0, 1, 2];
      const photoList = [
        { original: 'photo1.jpg', small: 'photo1_small.jpg' },
        { original: 'photo2.jpg', small: 'photo2_small.jpg' },
        { original: 'photo3.jpg', small: 'photo3_small.jpg' },
      ];
      const expectedUrls = ids.map((id) => `/assets/images-output/${photoList[id].small}`);
      jest.spyOn(photoHttpMock, 'getPhotoList').mockReturnValueOnce(of(photoList).pipe(delay(1000)));

      service.getTeaserPhotoSrc(ids).subscribe((result) => {
        expect(result).toEqual(expectedUrls);
        done();
      });
    });
  });

  describe('getOriginalPhotoSrcList', () => {
    it('should get the original photo source list', () => {
      const expectedList = mockPhotoList.map((photo) => `/assets/images-output/${photo.original}`);

      service.getOriginalPhotoSrcList().subscribe((list: string[]) => {
        expect(list).toEqual(expectedList);
      });

      expect(photoHttpMock.getPhotoList).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTeaserPhotoList', () => {
    it('should get the teaser photo source list', () => {
      const expectedList = mockPhotoList.map((photo) => `/assets/images-output/${photo.small}`);

      service.getTeaserPhotoList().subscribe((list: string[]) => {
        expect(list).toEqual(expectedList);
      });

      expect(photoHttpMock.getPhotoList).toHaveBeenCalledTimes(1);
    });
  });
});
