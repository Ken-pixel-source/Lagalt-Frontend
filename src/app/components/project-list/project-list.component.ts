import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/projects';
import {ProjectService} from 'src/app/services/ProjectService'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
    
    ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projectsData) => {
        this.projects = projectsData;
        this.filterProjects();
      },
      error: (error) => console.log(error)
    })
  }
  searchQuery: string = ''; // Property to store the search query
  filteredProjects: Project[] = []; // Property to store filtered projects

  filterProjects() {
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
