import { CARD_ID } from '../actions/index';

export default function(state = [], action) {

	switch (action.type) {
		case CARD_ID:

		return [ action.payload.data, ...state ];
	}

	return state;

}