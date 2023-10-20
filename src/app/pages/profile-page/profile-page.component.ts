import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects';
import { ActivatedRoute, Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  project: Project | undefined;

  user: any;
  userSkills: any;
  userPortfolio: any;
  userJoinedProjects: any;

  userName: string | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userName = keycloak.tokenParsed?.preferred_username;


    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
      });
    }
  }

  public showModal = false;
  handleSave(data: any) {
    console.log(data);

    this.userSkills = data.skills;
    this.userPortfolio = data.portfolio;

    this.showModal = false;
  }

  goBack(): void {
    this.router.navigate(['/project']);
  }
}
