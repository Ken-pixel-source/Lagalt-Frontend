import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { TagsCreate } from 'src/app/models/projects';
import { ProjectService } from 'src/app/services/ProjectService';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  project: any = {
    name: '',
    description: '',
    imageUrl: '',
    projectTypes: [],
    tags: []
  };
  projectTypes: any[] = [];
  tagInput: string = '';

  constructor(private projectService: ProjectService, private router: Router) { }



  createProject() {
    const tagsArray = this.tagInput.split(',').map(tag => tag.trim());
    this.project.tags = tagsArray.map(tagName => ({ TagName: tagName }));




    this.projectService.createProject(this.project).pipe(
      switchMap((response: any) => {

        const projectId = response.projectId;
        console.log('Project created successfully!', response);


        const addTagObservables = this.project.tags.map((tag: TagsCreate) =>
        this.projectService.addTag(projectId, tag)
      );

        return forkJoin(addTagObservables);
      })
    ).subscribe(
      (response) => {
        console.log('Tags added successfully!', response);
        this.router.navigate(['/project']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  ngOnInit() {
    this.projectService.getProjectType().subscribe(
      (projectTypes) => {
        this.projectTypes = projectTypes;
      },
      (error) => {
        console.error('Error fetching project types:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
