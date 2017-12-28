import { CARD_RULINGS } from '../actions/index';

export default function(state = {}, action) {

	switch (action.type) {
		case CARD_RULINGS:

		return action.payload.data;
	}

	return state;

}