import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmComponent } from './mitm.component';

describe('MitmComponent', () => {
  let component: MitmComponent;
  let fixture: ComponentFixture<MitmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
