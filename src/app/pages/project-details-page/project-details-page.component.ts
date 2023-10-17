import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css']
})
export class ProjectDetailsPageComponent  implements OnInit{

 

  constructor(private userService: UserService) {}
  ngOnInit() {


    
    this.userService.registerUser().subscribe(
      (response) => {
        // User registration successful, handle the response
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}

