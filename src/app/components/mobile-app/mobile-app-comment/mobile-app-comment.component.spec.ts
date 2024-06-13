import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppCommentComponent } from './mobile-app-comment.component';

describe('MobileAppCommentComponent', () => {
  let component: MobileAppCommentComponent;
  let fixture: ComponentFixture<MobileAppCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAppCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
