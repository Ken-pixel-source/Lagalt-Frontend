import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { PortfolioProject } from 'src/app/models/portofolio';
import keycloak from 'src/keycloak';
import { skills } from 'src/app/models/user';

@Component({
  selector: 'app-delete-portfo-skills',
  templateUrl: './delete-portfo-skills.component.html',
  styleUrls: ['./delete-portfo-skills.component.css']
})
export class DeletePortfoSkillsComponent implements OnInit {

  userSkills: skills[] = [];
  public portfolios: PortfolioProject[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.fetchSkills(userId);
      this.fetchPortfolios(userId);
    }
  }

    fetchSkills(userId: string): void {
      this.userService.getSkillsByUserId(userId).subscribe(skills => {
        this.userSkills = skills.map(skill => skill as unknown as skills);
      });
    }

    fetchPortfolios(userId: string): void {
      this.userService.getUserPortfolios(userId).subscribe(
        data => this.portfolios = data
      );
    }

    onDeleteSkill(skillId: number): void {
      const userId = keycloak.tokenParsed?.sub;
      if (userId) {
          this.userService.deleteUserSkill(skillId.toString(), userId).subscribe(() => {
              this.fetchSkills(userId); // Refresh the skills list after deletion
          });
      }
  }



  onDeletePortfolio(portfolioProjectId: number): void {
    const userId = keycloak.tokenParsed?.sub;
    if (userId) {
      this.userService.deletePortfolio(userId, portfolioProjectId.toString()).subscribe(() => {
        this.fetchPortfolios(userId); // Refresh the portfolio list after deletion
      });
    }
  }
}
