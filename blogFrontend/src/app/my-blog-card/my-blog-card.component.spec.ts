import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogCardComponent } from './my-blog-card.component';

describe('MyBlogCardComponent', () => {
  let component: MyBlogCardComponent;
  let fixture: ComponentFixture<MyBlogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBlogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
