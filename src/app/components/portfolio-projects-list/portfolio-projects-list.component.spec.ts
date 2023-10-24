import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProjectsListComponent } from './portfolio-projects-list.component';

describe('PortfolioProjectsListComponent', () => {
  let component: PortfolioProjectsListComponent;
  let fixture: ComponentFixture<PortfolioProjectsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioProjectsListComponent]
    });
    fixture = TestBed.createComponent(PortfolioProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
