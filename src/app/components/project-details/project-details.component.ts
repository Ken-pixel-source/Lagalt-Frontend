import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/ProjectService';
import { UserService } from 'src/app/services/userService';
import { Project, ProjectType } from 'src/app/models/projects';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  projectTypeName: string | undefined;
  projectLeaderName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService // Import the user service
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

          // Find project leader name
          this.userService.getUsers().subscribe((users) => {
            const projectLeader = users.find((user) => user.userId === this.project?.ownerId);
            if (projectLeader) {
              this.projectLeaderName = projectLeader.userName;
            }
          });
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

  requestToJoinProject() {
    if (this.project) {
      const projectId = this.project.projectId.toString(); // Convert to string
      this.projectService.requestToJoinProject(projectId).subscribe({
        next: () => {
          // Handle success
          // For example, you can show a success message or redirect the user
          console.log('Request to join project successful');
          // You can also navigate the user back to the project list or another page
          this.router.navigate(['/project']);
        },
        error: (error) => {
          // Handle error
          // Display an error message to the user or handle the error appropriately
          console.error('Error while requesting to join the project:', error);
          // You might want to show an error message to the user, e.g., using a toast or alert
          // this.errorMessage = 'An error occurred while requesting to join the project';
        },
      });
    }
  }
  
  

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
