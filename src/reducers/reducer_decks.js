import { DECK_PERMA } from '../actions/index';

export default function(state = {

	status: '', 
	list: []

}, action) {

	let flag = null;

	switch (action.type) {
		case DECK_PERMA:

		// console.log('t');
		// if(!action.payload) {
			// console.log(action.payload.request.status);
		// };
		if(action.payload.request.status === 404) {
			flag = 1;
			return Object.assign({}, state, {
				status: 'Invalid Permalink'
			});
		} 

		
		state.list.forEach(function(deck) {
			if(deck.record.id === action.payload.data.record.id) {
				flag = 1;
			}
		});
		
		if(!flag) {
			// OR state.concat([ action.payload.data ]);
			// return [ action.payload.data, ...state ];
			// state.list.concat[action.payload.data];

			return Object.assign({}, state, {
				list: state.list.concat([action.payload.data]),
				status: ''
			});
			

			// return state;

		} else {
			// console.log('deck already imported');
			// state.status = 'deck already imported';
			return Object.assign({}, state, {
				status: 'Deck already imported'
			});
		}		
	}

	return state;
}
