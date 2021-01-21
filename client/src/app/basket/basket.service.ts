import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private apiUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }


  addItemToBasket(item: IProduct, quantity = 1){

    const itemToAdd: IBasketItem = this.ConvertProductToBasketITem(item, quantity);
    const basket: IBasket = this.getCurrentBasketValue() ?? this.CreateBasket();
    basket.items = this.AddOrUpdateBasketItem(basket.items, itemToAdd, quantity);
    return this.setBasket(basket);
  }


  private AddOrUpdateBasketItem(items: IBasketItem[], item: IBasketItem, quantity: number): IBasketItem[] {

    const itemIndex = items.findIndex(i => i.id === item.id);

    if (itemIndex === -1){
      item.quantity = quantity;
      items.push(item);
    }
    else
    {
      items[itemIndex].quantity += quantity;
    }

    return items;

  }


  private ConvertProductToBasketITem(item: IProduct, quantity: number): IBasketItem {

    return {
      id: item.id,
      productName: item.name,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }

  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }


  getBasket(id: string){
    this.http.get(this.apiUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    );
  }


  setBasket(basket: IBasket){
    this.http.post(this.apiUrl + 'basket', basket)
    .subscribe((bs: IBasket) => {this.basketSource.next(bs); console.log(bs); },
    error => {
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }
}
