import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/ProjectService';
import { Project, ProjectType } from 'src/app/models/projects';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  projectTypeName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe({
        next: (projectData) => {
          this.project = projectData;
          if (this.project && this.project.projectTypeId) {
            this.getProjectTypeName(this.project.projectTypeId);
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  getProjectTypeName(projectTypeId: number): void {
    this.projectService.getProjectTypeName(projectTypeId).subscribe({
      next: (typeName) => {
        this.projectTypeName = typeName;
      },
      error: (error) => console.log(error),
    });
  }

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
