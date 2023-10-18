import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/ProjectService';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {
  project: any = {
    name: '',
    description: '',
    tags: [], // Initialize tags as an empty array
  };
  tags: string = '';

  constructor(private projectService: ProjectService, private router: Router) {}

  createProject() {
    // Split the input tags string into an array
    this.project.tags = this.tags.split(',').map((tag) => tag.trim());
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

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
