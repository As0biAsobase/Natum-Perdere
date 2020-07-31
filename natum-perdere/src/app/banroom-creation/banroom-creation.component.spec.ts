import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanroomCreationComponent } from './banroom-creation.component';

describe('BanroomCreationComponent', () => {
  let component: BanroomCreationComponent;
  let fixture: ComponentFixture<BanroomCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanroomCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanroomCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
