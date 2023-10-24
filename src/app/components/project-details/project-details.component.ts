import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { ProjectService } from 'src/app/services/ProjectService';
import { UserService } from 'src/app/services/userService';
import { Project, ProjectType, Tags } from 'src/app/models/projects';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  projectUsers: any[] = [];
  projectTypeName: string | undefined;
  projectLeaderName: string | undefined;
  projectTagName: string | undefined;
  tags: Tags[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.fetchProjectUsers(projectId);

      this.projectService.getProjectById(projectId).subscribe({
        next: (projectData) => {
          this.project = projectData;
          if (this.project && this.project.projectTypeId) {
            this.getProjectTypeName(this.project.projectTypeId);
          }

          // Fetch tags for the project
          this.projectService.getProjectTags(projectId).subscribe({
            next: (tagsData) => {
              this.tags = tagsData;
            },
            error: (error) => console.log(error),
          });

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
  requestToJoinProject() {
    if (this.project) {
      const projectId = this.project.projectId.toString();
      this.projectService.requestToJoinProject(projectId).subscribe({
        next: () => {
          console.log('Request to join project successful');
          alert("request sent!")
        },
        error: (error) => {
          console.error('Error while requesting to join the project:', error);
        },
      });
    }
  }

  fetchProjectUsers(projectId: string) {
    this.projectService.getUsersByProjectId(parseInt(projectId, 10)).subscribe(users => {
      this.projectUsers = users;
    });
  }

  isAuthorizedToView(): boolean {
    const loggedInUserId = keycloak.tokenParsed?.sub;  // Using Keycloak to get the logged-in user's ID

    if (this.project?.ownerId === loggedInUserId) {
      return true;
    }

    return this.projectUsers.some(user => user.userId === loggedInUserId);
  }

  getProjectTypeName(projectTypeId: number): void {
    this.projectService.getProjectTypeName(projectTypeId).subscribe({
      next: (typeName) => {
        this.projectTypeName = typeName;
      },
      error: (error) => console.log(error),
    });
  }

  getTagName(id: number, tagId: number): void {
    this.projectService.getProjectTagName(id, tagId).subscribe({
      next: (tagName) => {
        this.projectTagName = tagName;
      },
      error: (error) => console.log(error),
    });
  }

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
