import { Component,OnInit } from '@angular/core';
import { ProfileService } from '../../services/profileService';
import { Project } from 'src/app/models/projects';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  project: Project | undefined;

  userDetails: any;
  userSkills: any;
  userPortfolio: any;
  userJoinedProjects: any;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    const userId = 1;

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
