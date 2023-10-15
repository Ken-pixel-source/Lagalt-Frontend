import { Component,OnInit } from '@angular/core';
import { ProfileService } from '../../services/profileService';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  userDetails: any;
  userSkills: any;
  userPortfolio: any;
  userJoinedProjects: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    const userId = 1; // You can adjust this based on the logged-in user

    this.profileService.getUserDetails(userId).subscribe(data => {
      this.userDetails = data;
    });

    this.profileService.getUserSkills(userId).subscribe(data => {
      this.userSkills = data;
    });

    this.profileService.getUserPortfolio(userId).subscribe(data => {
      this.userPortfolio = data;
    });

    this.profileService.getUserJoinedProjects(userId).subscribe(data => {
      this.userJoinedProjects = data;
    });
  }

}
