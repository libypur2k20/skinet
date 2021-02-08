import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { ShopService } from '../shop/shop.service';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  incrementDecrementQuantity(productId: number, quantity: number){
      this.basketService.updateBasketItemQuantity(productId, quantity);
  }

  removeItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
}

