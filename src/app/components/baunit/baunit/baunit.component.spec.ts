import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaunitComponent } from './baunit.component';

describe('BaunitComponent', () => {
  let component: BaunitComponent;
  let fixture: ComponentFixture<BaunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaunitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
