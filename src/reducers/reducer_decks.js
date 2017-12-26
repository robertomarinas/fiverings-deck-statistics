import { DECK_PERMA } from '../actions/index';

export default function(state = {

	status: '',
	list: []

}, action) {

	let flag = null;
	let urlType;

	switch (action.type) {
		case DECK_PERMA:

		if(action.payload.message === "Network Error" && action.error) {
			flag = 1;
			return Object.assign({}, state, {
				status: "Network Error! Please check if you have connection and if the URL is valid."
			});
		} else if(action.payload.request.status === 404) {
			flag = 1;
			return Object.assign({}, state, {
				status: 'Invalid Deck URL!'
			});
		} else if(action.payload.request.status === 500) {
			flag = 1;
			return Object.assign({}, state, {
				status: 'Server Error!'
			});
		} else if(action.payload.request.status === 200) {
			
			state.list.forEach(function(deck) {
				if(deck.record.id === action.payload.data.record.id) {
					flag = 1;
				}
			});

			if(!flag) {
				let responseURL = action.payload.request.responseURL;
				responseURL = responseURL.split('/');

				return Object.assign({}, state, {
					list: state.list.concat([{urlType: responseURL[3], ...action.payload.data}]),
					status: ''
				});
			} else {
				return Object.assign({}, state, {
					status: 'Deck already imported!'
				});
			}
		}		
	}

	return state;
}
