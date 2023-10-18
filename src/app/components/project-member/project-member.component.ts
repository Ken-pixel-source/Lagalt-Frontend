import { Component } from '@angular/core';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent {
  activeTab: string = 'London';

  openTab(cityName: string) {
    this.activeTab = cityName;
  }
}
