import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/ProjectService';
import { Project } from 'src/app/models/projects';
import { ActivatedRoute } from '@angular/router';
import keycloak from 'src/keycloak';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent implements OnInit {
  activeTab: string = 'Message';
  project: Project | undefined;
  projectUsers: any[] = [];
  projectRequests: any[] = [];
  userDetails: any; // To store fetched user details
  showModal: boolean = false;
  loading: boolean = true;

  constructor(private projectService: ProjectService, private userService: UserService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.fetchProjectDetails(projectId);
      this.fetchProjectUsers(projectId);
      this.fetchJoinRequests(projectId);
    }
  }

  removeUserFromProject(userId: string) {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.removeUserFromProject(projectId, userId).subscribe(() => {
        // Once the removal is successful, remove that user from the projectUsers array
        this.projectUsers = this.projectUsers.filter(user => user.userId !== userId);
      }, error => {
        // Handle error here, maybe show a message to the user
        console.error('Error removing the user:', error);
      });
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

  fetchJoinRequests(projectId: string) {
    this.projectService.getRequestToJoinProject(projectId).subscribe(requests => {
      this.projectRequests = requests;
      this.fetchUserNamesForRequests();
    });
  }

  acceptRequest(requestId: string) {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.acceptJoinRequest(projectId, requestId).subscribe(() => {
        // Once the request is successful, remove that request from the list
        this.projectRequests = this.projectRequests.filter(request => request.projectRequestId !== +requestId);
      }, error => {
        // Handle error here, maybe show a message to the user
      });
    }
  }

  viewUserDetails(userId: string): void {
    this.userService.getUserDataById(userId).subscribe(details => {
      this.userDetails = details;
      this.showModal = true;
    });
  }

  closeModal(): void {
    this.showModal = false; // Hide the modal
  }

  deleteRequest(requestId: string): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
        this.projectService.deleteJoinRequest(projectId, requestId).subscribe(() => {
            this.projectRequests = this.projectRequests.filter(request => request.projectRequestId !== requestId);
        });
    }
}


  fetchUserNamesForRequests() {
    this.projectRequests.forEach((request, index) => {
      this.userService.getUserById(request.userId).subscribe(user => {
        this.projectRequests[index].userName = user.userName;
      });
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

