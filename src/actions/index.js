import axios from 'axios';

const STRAIN_URL = `https://api.fiveringsdb.com/strains/`;
const CARD_URL 	 = `https://api.fiveringsdb.com/cards/`;

export const DECK_PERMA = 'DECK_PERMA';
export const CARD_ID = 'CARD_ID';

// Action Creator
export function fetchDeck(perma) {

	const url = `${STRAIN_URL}${perma}`;
	// Returns a Promise as Payload
	const request = axios.get(url).catch(error => {
	});

	return {
		type: DECK_PERMA,
		payload: request
	};
}

export function fetchFateCost(cardID) {

	const url = `${CARD_URL}${cardID}`;

	const request = axios.get(url).catch(error => {
	});

	return {
		type: CARD_ID,
		payload: request
	}
}

