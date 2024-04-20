import { Model } from './base/Model';
import { IProduct, IOrder, IAppState, FormErrors } from '../types';
import { IEvents } from './base/Events';
import { Card } from './Card';

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

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(item: IProduct) {
		this.basket.push(item);
		this.emitChanges('basket:changed', item);
	}















	/* removeFromBasket(item: IProduct) {
		this.basket = this.basket.filter((it) => it != item);
		this.emitChanges('basket:changed');
	} */

	/* getTotal(): number {
		return this.basket.reduce((total, IProduct) => total + IProduct.price, 0);
	} */
}



























/* import { Model } from './base/Model';
import { IProduct, IOrder, IAppState, FormErrors } from '../types';
import { IEvents } from './base/Events';

export class ProductItem extends Model<IProduct> {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}

export class AppState extends Model<IAppState> {
	catalog: ProductItem[];
	basket: ProductItem[];
	order: IOrder;
	preview: string | null;
	formErrors: FormErrors = {};

	constructor(data: Partial<IAppState>, protected events: IEvents) {
		super(data, events);
		this.basket = [];
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new ProductItem (item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ProductItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}
	
	addToBasket(item: ProductItem) {
		this.basket.push(item);
		this.emitChanges('basket:changed', item);
	}











	/* removeFromBasket(item: ProductItem) {
		this.basket = this.basket.filter((it) => it != item);
		this.emitChanges('basket:changed');
	} */

	/* getTotal(): number {
		return this.basket.reduce((total, IProduct) => total + IProduct.price, 0);
	}
} */