import { Model } from './base/Model';
import { IProduct, IOrder, IAppState, FormErrors } from '../types';
import { IEvents } from './base/Events';

export class AppState extends Model<IAppState> {
	catalog: IProduct[] = [];
	basket: IProduct[] = [];
	order: IOrder;
	preview: string | null;
	formErrors: FormErrors = {};

	constructor(data: Partial<IAppState>, protected events: IEvents) {
		super(data, events);
		this.basket = [];
	}

	setCatalog(items: IProduct[]) {
		items.forEach((item) => (this.catalog = [...this.catalog, item]));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}
	
	getBasketItems(): IProduct[] {
		return this.basket;
	}

	addToBasket(item: IProduct) {
		if (this.basket.indexOf(item) <= 0) {
			this.basket.push(item);
			this.emitChanges('basket:changed', item);
		}
	}

	removeFromBasket(item: IProduct) {
		this.basket = this.basket.filter((it) => it != item);
		this.emitChanges('basket:remove');
	}

	getTotal(): number {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}
}