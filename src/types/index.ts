export interface IPage {
    header: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export interface IProductCard {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: ICategoryItem;
}

export interface ICatalogItems {
    items: IProductCard[];
    setItems(items: IProductCard[]): void;
    getProduct(id: string): void;
}

export interface IBasket {
    counter: number;
    items: IProductCard[] | null;
    total: number | null;
    add(id: string): void;
    remove(id: string): void;
}

export interface IOrderForm {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProductCard[] | null;
    total?: number | null;
}

export interface IModal {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProductCard[] | null;
    total?: number | null;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IPaymentForm extends IModal {
    payment: IPayment; 
    address: string;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IContactsForm extends IModal { 
    email: string;
    phone: string;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface ISuccessForm extends IModal {
    total: number;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IFormErrors {
    validity: boolean;
    errors: string[];
}

export type IPayment = 'Онлайн' | 'При получении';
export type ICategoryItem = 
    'софт-скил' | 
    'хард-скил' | 
    'кнопка' | 
    'другое' | 
    'дополнительное';