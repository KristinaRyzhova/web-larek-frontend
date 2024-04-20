import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { AppState } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { IProduct } from './types';

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

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);

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
	page.counter = appState.basket.length;
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
		onClick: () => events.emit('card:add', item)
	});

	modal.render({
		content: card.render({
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			category: item.category,
			button: appState.basket.indexOf(item) < 0 ? 'Купить' : 'Уже в корзине'
		}),
	});
});

// работаем с корзиной

// открыть корзину
events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    })
	console.log(appState.basket);
});

















/* events.on('basket:changed', () => {
	const items = appState.basket.map((item, index) => {
		const card = new Card(cloneTemplate(basketItemsTemplate), {
			onClick: () => events.emit('product:addToBasket', item)
		});
		return card.render({
			index: index + 1,
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			category: item.category,
		})

	})
	modal.render({
		content: basket.render({
			items,
		})
	});
}); */




	





/* events.on('basket:changed', (item: IProduct) => {
	const card = new Card(cloneTemplate(basketItemsTemplate), {
		onClick: () => events.emit('product:addToBasket', item)
	});

	modal.render({
		content: card.render({
			title: item.title,
			price: item.price,
		})
	});
});

// добавлем товар в корзину
events.on('card:add', (item: IProduct) => {
	appState.addToBasket(item);
	modal.close();
}); */

















/* // удаляем товар из корзины
events.on('product:delete', (item: ProductItem) => {
	appState.removeFromBasket(item)
}); */

/* events.on('counter:changed', () => {
	page.counter = appState.basket.length;
}); */