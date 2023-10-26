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
  projectTags: string[] = [];

  constructor(private router: Router, private projectService: ProjectService) {}



  ngOnInit(): void {
    if (this.project && this.project.projectTypeId) {
      this.getProjectTypeName(this.project.projectTypeId);
      this.getProjectTags(this.project.projectId)
    }


  }
  // Gets the projettype name by the id thats in the project
  getProjectTypeName(projectTypeId: number): void {
    this.projectService.getProjectTypeName(projectTypeId).subscribe({
      next: (typeName) => {
        this.projectTypeName = typeName;
      },
      error: (error) => console.log(error),
    });
  }

  getProjectTags(projectId: number): void {
    this.projectService.getProjectTags(projectId.toString()).subscribe({
      next: (tags) => {
        this.projectTags = tags.map(tag => tag.tagName);
      },
      error: (error) => console.log(error),
    });
  }

}



