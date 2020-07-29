import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanroomComponent } from './banroom.component';

describe('BanroomComponent', () => {
  let component: BanroomComponent;
  let fixture: ComponentFixture<BanroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
