import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { AppState } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, BasketCard } from './components/Card';
import { PaymentForm } from './components/PaymentForm';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Success } from './components/Success';
import { IContactForm, IPaymentForm, IProduct, TPayment } from './types';


const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
const appState = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketItemsTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const paymentFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success')

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const paymentForm = new PaymentForm(cloneTemplate(paymentFormTemplate), events);
const contactForm = new PaymentForm(cloneTemplate(contactFormTemplate), events);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

// загружаем галерею с товарами
api
	.getProductItems()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});

events.on('items:changed', () => {
	page.catalog = appState.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:select', item);
			},
		});
		return card.render(item);
	});
});

events.on('card:select', (item: IProduct) => {
	appState.setPreview(item);
});

events.on('preview:changed', (item: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('product:add', item)
		}
	});
	modal.render({
		content: card.render({
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			category: item.category,
			button: appState.setButtonText(item)
		})
	});
});

// работаем с корзиной

// открыть корзину
events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    })
});

// добавлем товар в корзину
events.on('product:add', (item: IProduct) => {
	appState.addToBasket(item);
	page.counter = appState.getBasketItems().length;
	modal.close();
});

// удаляем товар из корзины
events.on('product:remove', (item: IProduct) => {
	appState.removeFromBasket(item),
	page.counter = appState.getBasketItems().length;
});

// изменения в корзине
events.on('basket:changed', () => {
	page.counter = appState.getBasketItems().length;
	let total = 0;
	basket.items = appState.basket.map((item, index) => {
		
		const card = new BasketCard(cloneTemplate(basketItemsTemplate), {
			onClick: () => {
				events.emit('product:remove', item),
				basket.total = appState.getTotal();
			},
		});
		total = total + item.price;
		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1
		})
		
	});
	
	basket.total = total;
});

events.on('order:open', () => {
	paymentForm.setButtonClass('');
	modal.render({
		content: paymentForm.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// выбираем метод оплаты
events.on('payment:changed', (data: { target: TPayment }) => {
	appState.setPaymentMethod(data.target);
});

// Изменился адрес доставки
events.on(/^order\..*:change/, (data: { value: string }) => {
	appState.setPaymentAddress(data.value);
});

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IPaymentForm>) => {
    const { payment, address } = errors;
    paymentForm.valid = !payment && !address;
    paymentForm.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
});

// Открыть форму заказа
events.on('order:submit', () => {
    modal.render({
        content: contactForm.render({
            phone: '',
            email: '',
            valid: false,
            errors: []
        })
    });
});

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IContactForm>) => {
    const { email, phone } = errors;
    contactForm.valid = !email && !phone;
    contactForm.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^contacts\..*:change/, (data: { field: keyof IContactForm, value: string }) => {
    appState.setContactField(data.field, data.value);
	
});

events.on('contacts:submit', () => {
	appState.setOrder();
	api
		.orderProduct(appState.order)
		.then(() => {
			const success = new Success(cloneTemplate(successTemplate),
				{
					onClick: () => {
						modal.close();
					},
				},
				appState.getTotal()
			);
			modal.render({
				content: success.render({}),
			});
			paymentForm.setButtonClass('');
			appState.clearOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});