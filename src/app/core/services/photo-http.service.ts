import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { IPhoto } from '../models/IPhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotoHttpService {

  public readonly basePath: string = '';
  private photoList!: IPhoto[];

  constructor(
    private http: HttpClient,
  ) {}

  fetch(): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(`${this.basePath}/assets/image-list.json`).pipe(
      tap(e => this.photoList = e),
      catchError(error => {
        console.error(error)
        return throwError(error);
      })
    );
  }

  getPhotoList(): Observable<IPhoto[]> {
    if (this.photoList) {
      return of(this.photoList);
    }

    return this.fetch();
  }
}
