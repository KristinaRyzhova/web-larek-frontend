export interface ICard {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: ICategory;
}

export interface IPage {
    wrapper: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export interface IModal {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: ICard[] | null;
    total?: number | null;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IBasket {
    items: HTMLElement[];
    total: number;
    selected: string[];
    list: HTMLElement;
    button: HTMLElement;
}

export interface IOrder  {
    payment: IPayment; 
    address: string;
    email: string;
    phone: string;
}

export interface ISuccess {
    total: number;
    onClick: () => void;
}

export interface IAppState {
    catalog: ICard[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IModal, string>>;
export type IPayment = 'Онлайн' | 'При получении';
export type ICategory = 
    'софт-скил' | 
    'хард-скил' | 
    'кнопка' | 
    'другое' | 
    'дополнительное';