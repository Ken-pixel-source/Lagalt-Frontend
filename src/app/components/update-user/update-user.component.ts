import { Component } from '@angular/core';
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

    constructor(private userService: UserService) {}

    updateUserDetails() {
        const loggedInUserId = keycloak.tokenParsed?.sub;

        if (loggedInUserId) {
            this.userService.updateUserDetails(loggedInUserId, this.Description, this.Education)
                .subscribe(
                    response => {
                        // Handle successful update, maybe show a success message
                        console.log("User details updated successfully.");
                    },
                    error => {
                        // Handle errors, maybe show an error message
                        console.error("Error updating user details:", error);
                    }
                );
        }
    }
}
