import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';
import { UserProfile, skills } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfilComponent {

   // For UpdateUserComponent
  userProfile: UserProfile = {} as UserProfile;
  Description: string = '';
  Education: string = '';

  // For EditProfileComponent
  public formData: skills[] = [];
  public newSkill: string = '';

  @Output() saveData = new EventEmitter<any>();
  @Output() closeModalRequest = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  updateUserDetails() {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.updateUserDetails(userId, this.Description, this.Education).subscribe(
        response => {
          console.log("User details updated successfully.");
          this.saveData.emit();
        },
        error => {
          console.error("Error updating user details:", error);
        }
      );
    }
  }

  addSkill() {
    if (this.newSkill.trim()) {
      this.formData.push({ skillId: 0, skillName: this.newSkill.trim() });
      this.newSkill = '';
    }
  }

  saveSkillsToServer() {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.formData.forEach(skillObj => {
        this.userService.addUserSkills(userId, skillObj.skillName).subscribe(
          response => {
            console.log("Skill added successfully:", response);
          },
          error => {
            console.error("Error adding skill:", error);
          }
        );
      });
    } else {
      console.error("No user ID found.");
    }
  }

  saveChanges() {
    this.updateUserDetails();
    this.saveSkillsToServer();
    this.saveData.emit(this.formData);
  }


  closeModal() {
    this.closeModalRequest.emit();
  }

}

