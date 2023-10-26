import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private projectService: ProjectService, private router: Router) {}

  createProject() {
    // Split the input tags string into an array
    const tagsArray = this.tagInput.split(',').map(tag => tag.trim());
    // Transforming each tag string to an object with tagName property
    this.project.tags = tagsArray.map(tagName => ({ tagName })); 
   

    this.project.projectStatusId = 1;
    console.log('Project data to be sent to the API:', this.project);
    this.projectService.createProject(this.project).subscribe(
      (response) => {
        // Handle the successful response, e.g., show a success message
        console.log('Project created successfully!', response);
        // You can also navigate to the project list or perform other actions
        this.router.navigate(['/project']);
      },
      (error) => {
        // Handle any errors that occur during project creation
        console.error('Error creating the project:', error);
        // You can display an error message or take appropriate action
      }
    );
  }
  
  ngOnInit() {
    // Fetch project types and store them in projectTypes
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
