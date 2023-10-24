import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/userService'; // Import the UserService

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit  {

  constructor(
    private http: HttpClient,
    private userService: UserService // Inject the UserService
  ) { }

  ngOnInit(): void {
    this.registerUser();
  }

  registerUser() {
    this.userService.registerUser().subscribe(
      response => {
        console.log("User registered successfully:", response);
      },
      error => {
        console.error("Error registering user:", error);
      }
    );
  }


}
