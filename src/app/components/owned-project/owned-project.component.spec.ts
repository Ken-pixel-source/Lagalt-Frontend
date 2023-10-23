import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedProjectComponent } from './owned-project.component';

describe('OwnedProjectComponent', () => {
  let component: OwnedProjectComponent;
  let fixture: ComponentFixture<OwnedProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnedProjectComponent]
    });
    fixture = TestBed.createComponent(OwnedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
