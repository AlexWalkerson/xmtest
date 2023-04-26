import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoHttpService } from './photo-http.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly photoPath: string = '/assets/images-output/';

  constructor(private readonly photoHttp: PhotoHttpService) { }

  getOriginalPhotoSrc(id: number): Observable<string> {
    return this.photoHttp.getPhotoList().pipe(
      map(list => `${this.photoPath}${list[id].original}`)
    );
  }

  getTeaserPhotoSrc(id: number): Observable<string> {
    return this.photoHttp.getPhotoList().pipe(
      map(list => `${this.photoPath}${list[id].small}`)
    );
  }

  getOriginalPhotoSrcList(): Observable<string[]> {
    return this.photoHttp.getPhotoList().pipe(
      map(list => list.map(e => `${this.photoPath}${e.original}`))
    )
  }

  getTeaserPhotoList(): Observable<string[]> {
    return this.photoHttp.getPhotoList().pipe(
      map(list => list.map(e => `${this.photoPath}${e.small}`))
    )
  }
}
