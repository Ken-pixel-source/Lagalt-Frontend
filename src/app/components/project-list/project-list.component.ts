import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectType } from 'src/app/models/projects';
import {ProjectService} from 'src/app/services/ProjectService'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  projectTypes: ProjectType[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
    
    ) {}

  ngOnInit(): void {
    //   Fetch projects from the service  
    this.projectService.getProjects().subscribe({
      next: (projectsData) => {
        this.projects = projectsData;
        this.filterProjects();
        console.log('Projects loaded:', this.projects);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
    // Fetch projecttypes from the service
    this.projectService.getProjectType().subscribe({
      next: (projectTypesData) => {
        this.projectTypes = projectTypesData;
        this.filterProjects();
        console.log('Project types loaded:', this.projectTypes);
      },
      error: (error) => {
        console.error('Error loading project types:', error);
      }
    });
  }

  searchQuery: string = ''; // Property to store the search query
  filteredProjects: Project[] = []; // Property to store filtered projects
  selectedProjectTypes: number[] = [];

  // Function to filter projects on input and checkbox
  filterProjects() {
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (
        this.selectedProjectTypes.length === 0 || (project.projectTypeId !== null && 
        this.selectedProjectTypes.includes(project.projectTypeId)
      ))
    );
  }

  toggleProjectTypeSelection(projectTypeId: number) {
    if (this.selectedProjectTypes.includes(projectTypeId)) {
      this.selectedProjectTypes = this.selectedProjectTypes.filter(id => id !== projectTypeId);
    } else {
      this.selectedProjectTypes.push(projectTypeId);
    }
    this.filterProjects();
  }
}
