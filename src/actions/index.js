import axios from 'axios';

const STRAIN_URL = `https://api.fiveringsdb.com/strains/`;
const DECK_URL = `https://api.fiveringsdb.com/decks/`;
const CARDS_URL  = `https://api.fiveringsdb.com/cards`;
const CARD_URL 	 = `https://api.fiveringsdb.com/cards/`;

export const DECK_PERMA = 'DECK_PERMA';
export const CARDS_LIST = 'CARDS_LIST';
export const CARD_ID = 'CARD_ID';

// Action Creator
export function fetchDeck(id, type) {
	let urlType;
	switch (type) {
		case 'strains':
			urlType = STRAIN_URL;
		break;

		case 'decks':
			urlType = DECK_URL;
		break;
	}
	const url = `${urlType}${id}`;
	
	// Returns a Promise as Payload
	const request = axios.get(url);

	return {
		type: DECK_PERMA,
		payload: request
	};
}

export function fetchCardsList() {

	const request = axios.get(CARDS_URL);

	return {
		type: CARDS_LIST,
		payload: request
	}

}

// export function fetchCardInfo(cardID) {

// 	const url = `${CARD_URL}${cardID}`;
// 	const request = axios.get(url);

// 	return {
// 		type: CARD_ID,
// 		payload: request
// 	}

// }

