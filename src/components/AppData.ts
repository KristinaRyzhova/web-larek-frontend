import { Model } from './base/Model';
import {IProduct, IOrder, IAppState, FormErrors} from '../types';
import { IEvents } from './base/events';

export type CatalogChangeEvent = {
	catalog: IProduct[];
};

export class ProductItem extends Model<IProduct> {
	id: string;
	title: string;
	price: number | null;
	description: string;
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
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ProductItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}
}