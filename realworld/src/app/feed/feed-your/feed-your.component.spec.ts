import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedYourComponent } from './feed-your.component';

describe('FeedYourComponent', () => {
  let component: FeedYourComponent;
  let fixture: ComponentFixture<FeedYourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedYourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedYourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
