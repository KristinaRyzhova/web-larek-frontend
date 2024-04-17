export interface IProduct {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: string;
    button: string;
    index?: string;
}

export interface IPage {
    wrapper: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export interface IModal {
    payment?: TPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProduct[] | null;
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
    payment: TPayment; 
    address: string;
    email: string;
    phone: string;
}

export interface ISuccess {
    total: number;
    onClick: () => void;
}

export interface IAppState {
    catalog: IProduct[];
    basket?: string[];
    preview?: string | null;
    order?: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IModal, string>>;
export type TPayment = 'Онлайн' | 'При получении';