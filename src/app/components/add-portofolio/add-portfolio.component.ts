import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';
import { PortfolioProject } from 'src/app/models/portofolio';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css']
})
export class AddPortfolioComponent {

  constructor(private userService: UserService) {}

  public portfolioData: PortfolioProject = {
    portfolioProjectId: 0,
    portfolioProjectName: '',
    portfolioProjectDescription: '',
    startDate: new Date(),
    endDate: new Date(),
    imageUrl: '',
    users: []
  };

  @Output() saveData = new EventEmitter<PortfolioProject>();
  @Output() closePortfolioModalRequest  = new EventEmitter<void>();

  savePortfolioToServer() {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.addPortfolio(userId, this.portfolioData).subscribe(
        response => {
          console.log("Portfolio added successfully:", response);
          this.saveData.emit(this.portfolioData);
          window.location.reload();
        },
        error => {
          console.error("Error adding portfolio:", error);
        }
      );
    } else {
      console.error("No user ID found.");
    }
  }

  savePortfolio() {
    this.savePortfolioToServer();
    this.closePortfolioModalRequest.emit();
  }


  closePortfolioModal() {
    this.closePortfolioModalRequest.emit();
  }

}
