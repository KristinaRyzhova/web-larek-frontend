import './scss/styles.scss';

import { LarekApi } from './components/base/larekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Page } from './components/common/Page';
import { AppState } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/common/Card';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
const page = new Page(document.body, events);
const appState = new AppState({}, events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

api
	.getProductItems()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});

events.on('items:changed', () => {
	page.catalog = appState.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
		});
	});
});