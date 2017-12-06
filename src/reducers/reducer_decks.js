import { DECK_PERMA } from '../actions/index';

export default function(state = [], action) {

	let flag = null;

	switch (action.type) {
		case DECK_PERMA:

		if(!action.payload) {
			console.log('invalid permalink');
		};

		state.forEach(function(value) {
			if(value.record.id === action.payload.data.record.id) {
				flag = 1;
				console.log(flag);
			}
		});

		if(!flag) {
			// OR state.concat([ action.payload.data ]);
			return [ action.payload.data, ...state ];	
		} else {
			console.log('deck already imported');
		}		
	}

	return state;
}
