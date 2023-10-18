import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/ProjectService';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() project?: Project;
  projectTypeName: string | undefined;

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    if (this.project && this.project.projectTypeId) {
      this.getProjectTypeName(this.project.projectTypeId);
    }
  }

  redirectToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  getProjectTypeName(projectTypeId: number): void {
    this.projectService.getProjectTypeName(projectTypeId).subscribe({
      next: (typeName) => {
        this.projectTypeName = typeName;
      },
      error: (error) => console.log(error),
    });
  }
}
