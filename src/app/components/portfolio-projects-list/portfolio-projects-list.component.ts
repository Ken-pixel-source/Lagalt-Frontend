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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.getUserPortfolios(userId).subscribe(
        (data: PortfolioProject[]) => {
          this.portfolios = data;
        },
        error => {
          console.error('Error fetching portfolios:', error);
        }
      );
    }
  }




}
