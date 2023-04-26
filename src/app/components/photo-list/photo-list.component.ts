import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

   srcList: string[] = [];

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {

    this.photoService.getTeaserPhotoList().pipe(
    ).subscribe(e => {
      this.srcList = e;
    });

  }

}
