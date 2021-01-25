import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private apiUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalsSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotals$ = this.basketTotalsSource.asObservable();


  constructor(private http: HttpClient) { }


  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd: IBasketItem = this.ConvertProductToBasketITem(item, quantity);
    const basket: IBasket = this.getCurrentBasketValue() ?? this.CreateBasket();
    basket.items = this.AddOrUpdateBasketItem(basket.items, itemToAdd, quantity);
    return this.setBasket(basket);
  }

  updateBasketItemQuantity(productId: number, quantity: number){
    const basket = this.getCurrentBasketValue();
    const itemToAdd: IBasketItem = basket.items[basket.items.findIndex(i => i.id === productId)];
    basket.items = this.AddOrUpdateBasketItem(basket.items, itemToAdd, quantity);
    return this.setBasket(basket);
  }



  private CalculateTotals(){
      const basket = this.getCurrentBasketValue();
      if (basket !== null){
        const shipping = 0;
        const subtotal = basket.items.reduce((subT, elem) => (elem.price * elem.quantity) + subT, 0);
        const total = shipping + subtotal;
        this.basketTotalsSource.next({shipping, subtotal, total});
      }
  }


  private AddOrUpdateBasketItem(items: IBasketItem[], item: IBasketItem, quantity: number): IBasketItem[] {

    const itemIndex = items.findIndex(i => i.id === item.id);

    if (itemIndex === -1){
      item.quantity = quantity;
      items.push(item);
    }
    else
    {
      const itemQuantity = items[itemIndex].quantity;
      const newQuantity = (itemQuantity + quantity);
      items[itemIndex].quantity = (newQuantity > 0 ? newQuantity : items[itemIndex].quantity);
    }

    return items;

  }


  removeItemFromBasket(item: IBasketItem)
  {
    const basket: IBasket = this.getCurrentBasketValue();
    // const itemIndex = basket.items.findIndex(i => i.id === item.id);
    // if (itemIndex !== -1){
    //  basket.items.splice(itemIndex, 1);
    //  this.setBasket(basket);
    // }
    if (basket.items.some(i => i.id === item.id)){
        basket.items = basket.items.filter(i => i.id !== item.id);
        if (basket.items.length > 0)
        {
          this.setBasket(basket);
        }
        else
        {
          this.deleteBasket(basket);
        }
    }

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


  private deleteBasket(basket: IBasket){

    return this.http.delete(this.apiUrl + 'basket?id=' + basket.id)
    .subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalsSource.next(null);
      localStorage.removeItem('basket_id');
    }, error =>{
      console.log(error);
    });

  }


  getBasket(id: string){
    return this.http.get(this.apiUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.CalculateTotals();
        // console.log(this.getCurrentBasketValue());
      })
    );
  }


  setBasket(basket: IBasket){
    return this.http.post(this.apiUrl + 'basket', basket)
    .subscribe((bs: IBasket) => {
      this.basketSource.next(bs);
      this.CalculateTotals();
      // console.log(bs);
      },
    error => {
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }
}
