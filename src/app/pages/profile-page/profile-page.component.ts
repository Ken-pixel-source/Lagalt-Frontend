import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { UserService } from 'src/app/services/userService';
import { User, skills  } from 'src/app/models/user';
import { Project } from 'src/app/models/projects';
import { PortfolioProject } from 'src/app/models/portofolio';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User | undefined;
  userSkills: skills[] = [];
  userName: string | undefined;
  userProjects: Project[] = [];
  portfolios: PortfolioProject[] = [];



  public showModal = false;
  public showPortfolioModal = false;
  public showSettingsMenu = false;
  public activeModal: 'skills' | 'portfolio' | 'details' | 'delete' | null = null;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userName = keycloak.tokenParsed?.preferred_username;
  

    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      // Fetching the user details of type User
      this.userService.getUserDataById<User>(userId).subscribe(data => {
        this.user = data;
      });

      // Fetching the skills of the user
      this.userService.getSkillsByUserId(userId).subscribe(skills => {
        this.userSkills = skills.map(skill => skill as unknown as skills);
      });

    }
    if (userId) {
      this.userService.getProjectsByUserId(userId).subscribe(projects => {
        this.userProjects = projects;
      });
    }
    if (userId) {
      this.userService.getUserPortfolios(userId).subscribe(
        (data: PortfolioProject[]) => {
          this.portfolios = data;
        },
        error => {
          console.error('Error fetching portfolios:', error);
        }
      );
    }


  }

  

      goBack(): void {
          this.router.navigate(['/project']);
        }



      toggleSettingsMenu(): void {
          this.showSettingsMenu = !this.showSettingsMenu;
      }

      openModal(type: 'skills' | 'portfolio' | 'details' | 'delete'): void {
          this.activeModal = type;
          this.showSettingsMenu = false; // Close the settings menu after opening the modal.
      }

      closeModal(): void {
          this.activeModal = null;
      }


      handleSave(data: any) {
        console.log(data)
        this.showModal = false;
      }

      handleCloseModal() {
        this.showModal = false;
      }

      portfolioSave(data: any) {
        console.log(data);
        this.showPortfolioModal = false;
    }
    
    
     closePortfolioModal() {
        this.showPortfolioModal = false;
     }

}
