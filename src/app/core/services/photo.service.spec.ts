import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { of } from 'rxjs';
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
    it('should get the original photo source', () => {
      const id = 0;
      const expectedSrc = `/assets/images-output/${mockPhotoList[id].original}`;

      service.getOriginalPhotoSrc(id).subscribe((src: string) => {
        expect(src).toEqual(expectedSrc);
      });

      expect(photoHttpMock.getPhotoList).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTeaserPhotoSrc', () => {
    it('should get the teaser photo source', () => {
      const id = 1;
      const expectedSrc = `/assets/images-output/${mockPhotoList[id].small}`;

      service.getTeaserPhotoSrc(id).subscribe((src: string) => {
        expect(src).toEqual(expectedSrc);
      });

      expect(photoHttpMock.getPhotoList).toHaveBeenCalledTimes(1);
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
