import { Model } from './base/Model';
import { IProduct, IOrder, IAppState, FormErrors, TPayment, IDeliveryForm, IContactForm } from '../types';
import { IEvents } from './base/Events';

export class AppState extends Model<IAppState> {
	catalog: IProduct[] = [];
	basket: IProduct[] = [];
	order: IOrder = {
		email: '',
		phone: '',
		payment: null,
		address: '',
		items: [],
		total: 0
	}
	preview: string | null;
	formErrors: FormErrors = {};

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

	setContactField(field: keyof IContactForm, value: string) {
		this.order[field] = value;
        if (this.validateContactForm()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateContactForm() {
        const errors: typeof this.formErrors = {};		
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}