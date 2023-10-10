import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/projects';
import { Product } from 'src/app/models/product';
import {ProjectService} from 'src/app/services/ProjectService'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  products: Product[] = []; // Replace with your product data
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
    
    ) {}
    goToProductDetail(productId: number): void {
      this.router.navigate(['products', productId], { relativeTo: this.route });
    }

  filteredProducts: Product[] = [];
  searchText: string = ''; // Initialize with an empty string
  categoryFilters: { [key: string]: boolean } = {};

  applySearch(): void {
    // Convert the searchQuery to lowercase for case-insensitive search
    const query = this.searchText.toLowerCase();

    // Filter products based on the search query
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }
  
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data) => {
      console.log('Projects:', data); // Log the response data
      this.projects = data.projects;
      this.cdr.detectChanges(); // Trigger change detection
    });
  }




  
  applyFilters(): void {
    const selectedCategories = Object.keys(this.categoryFilters).filter(
      (key) => this.categoryFilters[key]
    );
  
    if (selectedCategories.length === 0) {
      // If no checkboxes are checked, show all products
      this.filteredProducts = [...this.products];
    } else {
      // Filter products based on selected categories
      this.filteredProducts = this.products.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
  }
  
}
