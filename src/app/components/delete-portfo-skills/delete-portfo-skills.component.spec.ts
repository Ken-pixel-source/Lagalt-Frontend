import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePortfoSkillsComponent } from './delete-portfo-skills.component';

describe('DeletePortfoSkillsComponent', () => {
  let component: DeletePortfoSkillsComponent;
  let fixture: ComponentFixture<DeletePortfoSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePortfoSkillsComponent]
    });
    fixture = TestBed.createComponent(DeletePortfoSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
