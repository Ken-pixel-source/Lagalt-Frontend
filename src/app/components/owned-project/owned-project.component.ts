import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';
import { Project } from 'src/app/models/projects';

@Component({
  selector: 'app-owned-project',
  templateUrl: './owned-project.component.html',
  styleUrls: ['./owned-project.component.css']
})
export class OwnedProjectComponent implements OnInit {

  public ownedProjects: Project[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.getUserOwnedProjects(userId).subscribe(
        (data: Project[]) => {
          this.ownedProjects = data;
        },
        error => {
          console.error('Error fetching owned projects:', error);
        }
      );
    }
  }
}
