import { Component, Output, EventEmitter} from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';
import { skills } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfilComponent {

  constructor(private userService: UserService) {}

  public formData: skills[] = [];

  public newSkill: string = '';

  @Output() saveData = new EventEmitter<any>();
  @Output() closeModalRequest = new EventEmitter<void>();


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


  save() {
    this.saveSkillsToServer();
    this.saveData.emit(this.formData);

  }

  closeModal() {
    this.closeModalRequest.emit();
  }

}

