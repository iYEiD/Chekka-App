import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSignupMethodComponent } from './choose-signup-method.component';

describe('ChooseSignupMethodComponent', () => {
  let component: ChooseSignupMethodComponent;
  let fixture: ComponentFixture<ChooseSignupMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseSignupMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseSignupMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
