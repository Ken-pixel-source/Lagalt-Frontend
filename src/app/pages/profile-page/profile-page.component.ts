import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { UserService } from 'src/app/services/userService';
import { User, skills  } from 'src/app/models/user';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User | undefined;
  userSkills: skills[] = [];
  userName: string | undefined;

  public showModal = false;
  public showPortfolioModal = false;
  public showUpdateUserModal = false;
  public showSettingsMenu = false;
  public activeModal: 'skills' | 'portfolio' | 'details' | null = null;


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
}

      goBack(): void {
          this.router.navigate(['/project']);
        }



      toggleSettingsMenu(): void {
          this.showSettingsMenu = !this.showSettingsMenu;
      }

      openModal(type: 'skills' | 'portfolio' | 'details'): void {
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

     handleUserUpdate() {
      console.log('User details updated');
      this.showUpdateUserModal = false;
    }

    openUpdateUserModal() {
      this.showUpdateUserModal = true;
    }

    closeUpdateUserModal() {
      this.showUpdateUserModal = false;
    }

}
