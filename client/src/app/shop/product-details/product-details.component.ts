import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantitySource = new BehaviorSubject<number>(1);
  quantity$ = this.quantitySource.asObservable();

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
    ) {
      this.bcService.set('@productDetails', '');
     }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    // El símbolo + que precede al this en el argumento de getProduct, convierte un string a numeric.
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(response => {
      this.product = response;
      this.bcService.set('@productDetails', this.product.name);
    }, error => {
      console.log(error);
    });
  }

  incrementDecrementItemQuantity(quantity: number){
    this.quantitySource.next(Math.max(this.quantitySource.getValue() + quantity, 1));
  }

  addToCart(){
    this.basketService.addItemToBasket(this.product, this.quantitySource.value);
  }

}
