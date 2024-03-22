export type IPayment = 'Онлайн' | 'При получении';
export type ICategoryItem = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';

export interface IProduct {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: ICategoryItem;
}

export interface ICatalogItems {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: string): void;
}

export interface IBasket {
    items: IProduct[] | null;
    total: number | null;
    add(id: string): void;
    remove(id: string): void;
}

export interface IOrderForm {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProduct[] | null;
    total?: number | null;
}

export interface IOrder extends IOrderForm {
	items: IProduct[] | null;
}

export interface IPaymentForm {
    payment: IPayment; 
    address: string;
}

export interface IContactsForm { 
    email: string;
    phone: string;
}

export interface ISuccessForm {
    total: number;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;