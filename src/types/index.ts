export interface ILarekApi {
    getProductItems: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
}

export interface IProductActions {
    onClick: (event: MouseEvent) => void;
}

export interface IProduct {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: string;
    button: string;
    index?: number;
}

export interface IPage {
    wrapper: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    basket: HTMLElement;
    locked: boolean;
}

export interface IBasketProduct {
    index: number;
    title: string;
    price: number;
    button: string;
}

export interface IPaymentForm {
    payment?: string;
    address?: string;
}

export interface IContactForm {
    email: string;
    phone: string;
}

export interface IOrder extends IPaymentForm, IContactForm {
    items: string[];
    total: number;
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface ISuccess {
    total?: number;
    onClick?: () => void;
}

export interface IAppState {
    list: IProduct[];
    basket?: IProduct[];
    preview?: string | null;
    order?: IOrder | null;
    total: string | number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
export type TPayment = 'Онлайн' | 'При получении';