import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectType } from 'src/app/models/projects';

@Component({
  selector: 'app-project-types',
  templateUrl: './project-types.component.html',
  styleUrls: ['./project-types.component.css']
})
export class ProjectTypesComponent {
  @Input() projectType?: ProjectType;
  @Output() projectTypeSelected = new EventEmitter<number>();

  constructor() {}

  onCheckboxChange(event: any) {
    this.projectTypeSelected.emit(this.projectType?.projectTypeId);
  }
}
