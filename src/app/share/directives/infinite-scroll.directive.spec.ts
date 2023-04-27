import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { jest } from '@jest/globals';


@Component({
  template: `
    <div style="height: 1000px;">
      <div *ngFor="let item of items" style="height: 100px;">
        {{ item }}
      </div>
      <div appInfiniteScroll (load)="onLoadMore()"></div>
    </div>
  `
})
class TestComponent {
  @Output() loadMore = new EventEmitter<void>();
  items = [1, 2, 3, 4, 5];

  onLoadMore(): void {
    this.loadMore.emit();
  }
}

describe('InfiniteScrollDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: InfiniteScrollDirective;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, InfiniteScrollDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
    directive = element.injector.get(InfiniteScrollDirective);
  });

  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  it('should create an instance', () => {
    const directive = new InfiniteScrollDirective();
    expect(directive).toBeTruthy();
  });

  it('should emit load event when scrolled to the bottom', () => {
    jest.spyOn(directive.load, 'emit');

    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollHeight - windowHeight;

    window.scrollTo(0, scrollTop);
    window.dispatchEvent(new Event('scroll'));

    expect(directive.load.emit).toHaveBeenCalled();
  });

  it('should emit load event when page is resized to show bottom of the page', () => {
    jest.spyOn(directive.load, 'emit');

    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollHeight - windowHeight + 100;

    window.scrollTo(0, scrollTop);

    window.dispatchEvent(new Event('resize'));

    expect(directive.load.emit).toHaveBeenCalled();
  });

  it('should not emit load event when not scrolled to the bottom', () => {
    jest.spyOn(directive.load, 'emit');

    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollHeight - windowHeight - 100;

    window.scrollTo(0, scrollTop);

    expect(directive.load.emit).not.toHaveBeenCalled();
  });

});
