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
    // Now you can use the registerUser() function from the UserService here if needed
    this.registerUser();
  }

  registerUser() {
    // Call the registerUser() function from the UserService
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
