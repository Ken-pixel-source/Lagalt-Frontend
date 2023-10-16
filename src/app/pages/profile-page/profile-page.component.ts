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

  public slickConfig = {
    "slidesToShow": 6,  // Number of slides to show at once
    "slidesToScroll": 1,  // Number of slides to scroll at once
    "dots": true,  // Show dots/navigation below the slides
    "infinite": true,  // Infinite loop sliding
    "autoplay": true,  // Auto play the slides
    "autoplaySpeed": 2000,  // Speed of auto play in milliseconds

    // Responsive breakpoint settings
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 600,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]
  };

}
