import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsCacheComponent } from './dns-cache.component';

describe('DnsCacheComponent', () => {
  let component: DnsCacheComponent;
  let fixture: ComponentFixture<DnsCacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnsCacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnsCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
