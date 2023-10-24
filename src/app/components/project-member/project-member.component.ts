import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/ProjectService';
import { Project } from 'src/app/models/projects';
import { ActivatedRoute } from '@angular/router';
import keycloak from 'src/keycloak';  // Assuming you're using the same keycloak import here

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent implements OnInit {
  activeTab: string = 'Messages';
  project: Project | undefined;
  projectUsers: any[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.fetchProjectDetails(projectId);
      this.fetchProjectUsers(projectId);
    }
  }

  fetchProjectDetails(projectId: string) {
    this.projectService.getProjectById(projectId).subscribe({
      next: (projectData) => {
        this.project = projectData;
      },
      error: (error) => console.log(error)
    });
  }

  fetchProjectUsers(projectId: string) {
    this.projectService.getUsersByProjectId(parseInt(projectId, 10)).subscribe(users => {
      this.projectUsers = users;
    });
  }

  isAuthorizedToView(): boolean {
    const loggedInUserId = keycloak.tokenParsed?.sub;
    return this.project?.ownerId === loggedInUserId;
  }

  openTab(projectThing: string) {
    this.activeTab = projectThing;
  }
}

