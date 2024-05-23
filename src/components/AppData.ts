import { Model } from './base/Model';
import { IProduct, IOrder, IAppState, FormErrors, IContactForm } from '../types';

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

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}
	
	setButtonText(item: IProduct) {
		if (this.basket.some((card) => card.id === item.id)) {
			return 'Уже в корзине';
		} else return 'Купить';
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

	setPaymentMethod(value: string): void {
		this.order.payment = value;
		this.validatePaymentForm();
	}

	setPaymentAddress(value: string): void {
		this.order.address = value;
		this.validatePaymentForm();
	}

	validatePaymentForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

    setContactField(field: keyof IContactForm, value: string) {
		this.order[field] = value;
        if (this.validateContactForm()) {
            this.events.emit('contacts:ready', this.order);
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

	setOrder():void {
		this.order.total = this.getTotal();
		this.order.items = this.getBasketItems().map((item) => item.id);
	}

	isItemInBasket(item: IProduct) {
        return this.basket.includes(item)
    }

	clearOrder() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0
		};
		this.basket = [];
		this.emitChanges('basket:changed');
	}


	getBasketItemIndex(item: IProduct): number {
		return this.basket.indexOf(item) + 1;
	}
}