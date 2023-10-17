import { Component, Input, OnInit } from '@angular/core';
import { ProjectType } from 'src/app/models/projects';

@Component({
  selector: 'app-project-types',
  templateUrl: './project-types.component.html',
  styleUrls: ['./project-types.component.css']
})
export class ProjectTypesComponent implements OnInit{
  @Input() projectType?: ProjectType;

  constructor() {}
  ngOnInit(): void {

  }
}
