import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';  // Add OnDestroy for component cleanup
import { UserService } from 'src/app/services/userService';
import { PortfolioProject } from 'src/app/models/portofolio';
import keycloak from 'src/keycloak';
import { Subscription } from 'rxjs';  // Import Subscription

@Component({
  selector: 'app-portfolio-projects-list',
  templateUrl: './portfolio-projects-list.component.html',
  styleUrls: ['./portfolio-projects-list.component.css']
})
export class PortfolioProjectsListComponent implements OnInit, OnDestroy {  // Implement OnDestroy

  public portfolios: PortfolioProject[] = [];
  public loading: boolean = true;

  private portfolioSubscription!: Subscription;  // To store the subscription

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.getUserPortfolios(userId).subscribe(
        (data: PortfolioProject[]) => {
          this.portfolios = data;
          this.loading = false;
        },
        error => {
          console.error('Error fetching portfolios:', error);
          this.loading = false;
        }
      );

      this.portfolioSubscription = this.userService.portfolioUpdateObservable$.subscribe(
        (response: PortfolioProject) => {
          console.log('Received new portfolio:', response);
          this.portfolios.push(response);
          this.cdr.detectChanges();
        }
      );
    } else {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {  // Component cleanup
    if (this.portfolioSubscription) {
      this.portfolioSubscription.unsubscribe();
    }
  }
}
