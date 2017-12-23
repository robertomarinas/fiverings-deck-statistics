import { CARDS_LIST } from '../actions/index';

export default function(state = {}, action) {

	switch (action.type) {
		case CARDS_LIST:

		// if(action.payload.error) {
		// 	return action.payload;
		// }
		// console.log(action.payload.data);

		// if(action)

		if(!action.payload.data) {
			return action.payload;
		} 
		// else {
		// 	return action.payload.data;	
		// }

		return action.payload.data;	
	}

	return state;

}