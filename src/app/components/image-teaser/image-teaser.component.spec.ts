import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTeaserComponent } from './image-teaser.component';

describe('ImageTeaserComponent', () => {
  let component: ImageTeaserComponent;
  let fixture: ComponentFixture<ImageTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTeaserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
