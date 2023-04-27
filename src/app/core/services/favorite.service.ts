import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/services/photo.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  readonly storageKey = 'favorite';

  constructor(
    private readonly localSt: LocalStorageService,
    private readonly photoService: PhotoService
  ) { }

  add(id: number): void {
    const data = this.get();
    data.push(id);
    this.set([...new Set( data )]);
  }

  remove(id: number): void {
    const data = this.get().filter(item => +item !== +id);
    this.set(data);
  }

  set(data: number[]): void {
    this.localSt.store(this.storageKey, data);
  }

  get(): number[] {
    return this.localSt.retrieve(this.storageKey) || [];
  }

  clear(): void {
    this.localSt.clear(this.storageKey);
  }

  getFavoriteSrc(): Observable<{id: number, src: string}[]> {
    const ids = this.get();
    return this.photoService.getTeaserPhotoSrc(ids).pipe(
      map(e => {
        return ids.map((id, index) => ({id, src: e[index]}));
      })
    );
  }

  getFavoriteSrcById(id: number): Observable<string> {
    const storedId = this.get().find(e => e === +id);
    return typeof storedId !== 'undefined' ?
      this.photoService.getOriginalPhotoSrc([storedId]).pipe(map(e => e[0])) :
      of(null);
  }
}
