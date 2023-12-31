import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { UserService } from 'src/app/services/userService';
import { User, skills  } from 'src/app/models/user';
import { Project } from 'src/app/models/projects';
import { PortfolioProject } from 'src/app/models/portofolio';
import { forkJoin } from 'rxjs';




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

  loading: boolean = true; 

  public showModal = false;
  public showPortfolioModal = false;
  public showSettingsMenu = false;
  public activeModal: 'skills' | 'portfolio' | 'details' | 'delete' | null = null;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userName = keycloak.tokenParsed?.preferred_username;
    const userId = keycloak.tokenParsed?.sub;
  
    if (userId) {
      const userData$ = this.userService.getUserDataById<User>(userId);
      const userSkills$ = this.userService.getSkillsByUserId(userId);
      const userProjects$ = this.userService.getProjectsByUserId(userId);
      const portfolios$ = this.userService.getUserPortfolios(userId);
  
      forkJoin([userData$, userSkills$, userProjects$, portfolios$]).subscribe(
        ([userData, userSkillsData, userProjectsData, portfoliosData]) => {
          this.user = userData;
          this.userSkills = userSkillsData.map(skill => skill as unknown as skills);
          this.userProjects = userProjectsData;
          this.portfolios = portfoliosData;
          this.loading = false;  // Set loading to false when all API calls are done
        },
        error => {
          console.error('Error fetching data:', error);
          this.loading = false;  // Also set to false in case of error to stop the spinner
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
