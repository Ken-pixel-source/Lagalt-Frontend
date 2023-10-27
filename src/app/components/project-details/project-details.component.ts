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

  loading: boolean = true;
  hasRequestedToJoin: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    const userId = keycloak.tokenParsed?.sub;

    if (projectId && userId) {
      this.projectService.checkIfRequestSent(projectId, userId).subscribe({
        next: (hasRequested) => {
          this.hasRequestedToJoin = hasRequested;
        },
        error: (error) => {
          console.error('Error checking request status:', error);
        },
      });
    }

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

              // Find project leader name
              this.userService.getUsers().subscribe((users) => {
                const projectLeader = users.find((user) => user.userId === this.project?.ownerId);
                if (projectLeader) {
                  this.projectLeaderName = projectLeader.userName;
                }

                this.loading = false; // Only set loading to false after all data fetching is done
              });
            },
            error: (error) => {
              console.log(error);
              this.loading = false;  // Set loading to false in case of error
            },
          });
        },
        error: (error) => {
          console.log(error);
          this.loading = false;  // Set loading to false in case of error
        },
      });
    } else {
      this.loading = false;  // Set loading to false if no projectId is available
    }
  }

  leaveCurrentProject(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.leaveProject(projectId).subscribe(() => {
        // Navigate the user back to the projects page
        this.router.navigate(['/project']);
        console.log('Successfully left the project.');
      }, error => {
        // Handle the error, maybe show a message to the user
        console.error('Error leaving the project:', error);
      });
    }
  }


  requestToJoinProject() {
    if (this.project) {
      const projectId = this.project.projectId.toString();
      this.projectService.requestToJoinProject(projectId).subscribe({
        next: () => {
          console.log('Request to join project successful');
          this.hasRequestedToJoin = true;

        },
        error: (error) => {
          if (error && error.message && error.message.includes("User has already sent a request to join the project.")) {
            this.hasRequestedToJoin = true;
            alert("You've already sent a request to join this project.");
          } else {
            console.error('Error while requesting to join the project:', error);
          }
        },
      });
    }
  }

  isUserOfProjectButNotOwner(): boolean {
    const loggedInUserId = keycloak.tokenParsed?.sub;


    return this.project?.ownerId !== loggedInUserId && this.projectUsers.some(user => user.userId === loggedInUserId);
  }



  fetchProjectUsers(projectId: string) {
    this.projectService.getUsersByProjectId(parseInt(projectId, 10)).subscribe(users => {
      this.projectUsers = users;
    });
  }

  isAuthorizedToView(): boolean {
    const loggedInUserId = keycloak.tokenParsed?.sub;

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

  isNotAuthorizedToView(): boolean {
    const loggedInUserId = keycloak.tokenParsed?.sub;

    if (this.project?.ownerId === loggedInUserId) {
        return false;
    }

    return !this.projectUsers.some(user => user.userId === loggedInUserId);
}

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
