import { CARDS_LIST } from '../actions/index';

export default function(state = {}, action) {

	switch (action.type) {
		case CARDS_LIST:

		return action.payload.data;
	}

	return state;

}