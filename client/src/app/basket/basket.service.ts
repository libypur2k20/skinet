import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string): Observable<void>{
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }


  setBasket(basket: IBasket): Subscription {
    return this.http.post(this.baseUrl + 'basket', basket)
    .subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }


  getCurrentBasketValue(): IBasket{
    return this.basketSource.value;
  }


  addItemToBasket(item: IProduct, quantity = 1): void{
    const itemToAdd: IBasketItem = this.fromProductToBasketItem(item, quantity);
    const basket: IBasket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.updateOrAddBasketItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }


  private calculateTotals(): void{
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((runningSubtotal, item) => (item.price * item.quantity) + runningSubtotal, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, subtotal, total});
  }


  private createBasket(): IBasket{
    const basket: IBasket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }


  private fromProductToBasketItem(product: IProduct, quantity: number): IBasketItem{
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      brand: product.productBrand,
      type: product.productType,
      pictureUrl: product.pictureUrl
    };
  }


  private updateOrAddBasketItem(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {

    const itemIndex: number = basketItems.findIndex(i => i.id === itemToAdd.id);

    if (itemIndex === -1){
        itemToAdd.quantity = quantity;
        basketItems.push(itemToAdd);
    } else {
      basketItems[itemIndex].quantity += quantity;
    }

    return basketItems;

  }
}
