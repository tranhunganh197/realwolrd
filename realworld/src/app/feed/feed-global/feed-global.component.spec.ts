import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedGlobalComponent } from './feed-global.component';

describe('FeedGlobalComponent', () => {
  let component: FeedGlobalComponent;
  let fixture: ComponentFixture<FeedGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
