import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFullComponent } from './image-full.component';

describe('ImageFullComponent', () => {
  let component: ImageFullComponent;
  let fixture: ComponentFixture<ImageFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
