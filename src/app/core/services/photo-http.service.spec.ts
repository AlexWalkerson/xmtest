import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IPhoto } from '../models/IPhoto';

import { PhotoHttpService } from './photo-http.service';

describe('PhotoHttpService', () => {
  let service: PhotoHttpService;
  let httpController: HttpTestingController;

  const mockPhotoList: IPhoto[] = [
    {original: 'original.jpg', small: 'small.jpg'},
    {original: 'original2.jpg', small: 'small2.jpg'},
    {original: 'original3.jpg', small: 'small3.jpg'},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PhotoHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    it('should fetch the photo list from the server', () => {
      service.fetch().subscribe((photoList: IPhoto[]) => {
        expect(photoList).toEqual(mockPhotoList);
      });

      const req = httpController.expectOne(`${service.basePath}/assets/image-list.json`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPhotoList);
    });

    it('should handle errors', () => {
      const errorMessage = 'Error fetching photo list';
      const error = new Error(errorMessage);

      service.fetch().subscribe({
        error: (err) => {
          expect(err).toBe(error);
        },
      });

      const req = httpController.expectOne(`${service.basePath}/assets/image-list.json`);
      expect(req.request.method).toBe('GET');
      req.flush(null, {status: 500, statusText: 'Server Error'});
    });
  });

  describe('getPhotoList', () => {
    it('should return the cached photo list if available', () => {
      service['photoList'] = mockPhotoList;

      service.getPhotoList().subscribe((photoList: IPhoto[]) => {
        expect(photoList).toEqual(mockPhotoList);
      });
    });

    it('should fetch the photo list from the server if not cached', () => {
      service.getPhotoList().subscribe((photoList: IPhoto[]) => {
        expect(photoList).toEqual(mockPhotoList);
      });

      const req = httpController.expectOne(`${service.basePath}/assets/image-list.json`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPhotoList);
    });
  });
});
