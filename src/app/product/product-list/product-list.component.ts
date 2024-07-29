import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeInterval } from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  filterProducts : Product[] = [];
  sortOrder: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      data =>{
        this.products = data;
        this.filterProducts = data;
      }, error =>{
        console.error(error);
      }
    )
  }

  addToCart(product: Product): void{
    this.cartService.addToCart(product).subscribe({
      next: () =>{
        this.snackBar.open("Product added to cart!", "",{
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
  }

  applyFilter(event : Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;

    searchTerm = searchTerm.toLowerCase();

    this.filterProducts = this.products.filter(product =>product.name.toLowerCase().includes(searchTerm));

    this.sortProducts(this.sortOrder);
  }


  sortProducts(sortValue: string):void {
    this.sortOrder = sortValue;

    if(this.sortOrder === 'priceLowHigh'){
      this.filterProducts.sort((a,b) => a.price - b.price)

    }else if(this.sortOrder === 'priceHighLow'){
      this.filterProducts.sort((a,b) => b.price - a.price)
    }
  }

}