import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfilComponent {
  constructor(private userService: UserService) {}

  public formData = {
    SkillName: [] as string[],  // Explicitly setting the type to string[]
};

  public newSkill: string = '';  // For two-way data binding with the skill input

  @Output() saveData = new EventEmitter<any>();

  // This function will add a skill to formData.skills
  addSkill() {
    if (this.newSkill.trim()) {
      this.formData.SkillName.push(this.newSkill.trim());
      this.newSkill = '';  // Clear the input field after adding
    }
  }

  // This function will make the API call to save the skills
  saveSkillsToServer() {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.formData.SkillName.forEach(Skill => {
        this.userService.addUserSkills(userId, Skill).subscribe(
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

  save() {
    this.saveSkillsToServer();
    this.saveData.emit(this.formData);
    this.closeModal();
  }

  closeModal() {
    // Your logic to close the modal
  }
}

