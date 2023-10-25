import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { PortfolioProject } from 'src/app/models/portofolio';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-portfolio-projects-list',
  templateUrl: './portfolio-projects-list.component.html',
  styleUrls: ['./portfolio-projects-list.component.css']
})
export class PortfolioProjectsListComponent implements OnInit {

  public portfolios: PortfolioProject[] = [];
  public loading: boolean = true;  // Initialize loading to true

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.getUserPortfolios(userId).subscribe(
        (data: PortfolioProject[]) => {
          this.portfolios = data;
          this.loading = false;  // Set loading to false after data fetching is done
        },
        error => {
          console.error('Error fetching portfolios:', error);
          this.loading = false;  // Set loading to false in case of error
        }
      );
    } else {
      this.loading = false;  // Set loading to false if no userId is available
    }
  }
}
