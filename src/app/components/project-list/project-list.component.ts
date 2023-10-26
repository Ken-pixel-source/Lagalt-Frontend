import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectType } from 'src/app/models/projects';
import {ProjectService} from 'src/app/services/ProjectService'
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

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

    loading: boolean = true;
    ngOnInit(): void {
      this.loading = true;  // Set loading to true at the start

      // Create observables for the two data fetches
      const projectsObservable = this.projectService.getProjects();
      const projectTypesObservable = this.projectService.getProjectType();

      // Use forkJoin to wait for both observables to complete
      forkJoin([projectsObservable, projectTypesObservable]).subscribe(
        ([projectsData, projectTypesData]) => {
          this.projects = projectsData;
          this.projectTypes = projectTypesData;
          this.filterProjects();
          console.log('Projects loaded:', this.projects);
          console.log('Project types loaded:', this.projectTypes);
          this.loading = false;  // Set loading to false when both calls are complete
        },
        (error) => {
          console.error('Error loading data:', error);
          this.loading = false;  // Set loading to false in case of error
        }
      );
  }


  searchQuery: string = '';
  filteredProjects: Project[] = [];
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
