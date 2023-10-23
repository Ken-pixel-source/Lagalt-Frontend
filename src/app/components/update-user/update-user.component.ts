import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';
import { UserProfile } from 'src/app/models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  userProfile: UserProfile = {} as UserProfile;
  Description: string = '';
  Education: string = '';

  @Output() saveData = new EventEmitter<void>();
  @Output() closeModalRequest  = new EventEmitter<void>();

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

  closeUpdateUserModal() {
    this.closeModalRequest.emit();
  }
}
