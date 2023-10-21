import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortofolioComponent } from './add-portofolio.component';

describe('AddPortofolioComponent', () => {
  let component: AddPortofolioComponent;
  let fixture: ComponentFixture<AddPortofolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPortofolioComponent]
    });
    fixture = TestBed.createComponent(AddPortofolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
