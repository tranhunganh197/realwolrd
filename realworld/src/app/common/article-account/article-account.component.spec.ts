import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAccountComponent } from './article-account.component';

describe('ArticleAccountComponent', () => {
  let component: ArticleAccountComponent;
  let fixture: ComponentFixture<ArticleAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
