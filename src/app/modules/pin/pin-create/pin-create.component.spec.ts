import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCreateComponent } from './pin-create.component';

describe('PinCreateComponent', () => {
  let component: PinCreateComponent;
  let fixture: ComponentFixture<PinCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
