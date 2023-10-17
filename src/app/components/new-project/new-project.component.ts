import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  };
  tags: string = '';

  constructor(private projectService: ProjectService) {}

  createProject() {
    // Split comma-separated tags and convert to an array
    const tagArray = this.tags.split(',').map((tag) => tag.trim());

    // Add the tag array to the project object
    this.project.tags = tagArray;

    // Send the project data to the server
    this.projectService.createProject(this.project).subscribe((response) => {
      // Handle the response (e.g., show a success message, navigate to the project list, etc.)
    });
  }

  goBack() {
    // Implement the logic to navigate back to the project list or previous page
  }
}
