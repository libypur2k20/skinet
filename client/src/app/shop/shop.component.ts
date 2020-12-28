import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import {ShopParams} from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  // Reference to the input #search element on the .html component file.
  @ViewChild('search', {static: true}) searchTerm: ElementRef;

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];

  shopParams: ShopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageIndex = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    },
    error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    },
    error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getProductTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    },
    error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChange(event: any){
    // this.shopParams.pageIndex = event.page;

    // If any pagination's html element properties changes, the pageChanged
    // event is fired. To prevent to fire the event more than once, we check
    // if page index has changed.
      if (this.shopParams.pageIndex !== event){
      // The pager component emits the page number as the only event's content.
      this.shopParams.pageIndex = event;
      this.getProducts();
    }
  }

  onSearchRequest(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSearchReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams.search = '';
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

}
