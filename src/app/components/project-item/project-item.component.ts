import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit{

  @Input() project?: Project;

  constructor(private router: Router) {} // Inject the Router module

  ngOnInit(): void {}

  redirectToProductDetail(productId: number): void {
    // Use Router.navigate to redirect to the detail page with the product ID as a parameter
    this.router.navigate(['/product', productId]);
  }
}
