import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit{
    productId: number | undefined;
    product: Product | undefined;
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.productId = +params['id']; // Convert the ID to a number
  
        // Fetch the product details using the productId
    
      });
    }
  
}
