import { combineReducers } from 'redux';
import DecksReducer from './reducer_decks';
import ActiveDeckReducer from './reducer_active_deck';

const rootReducer = combineReducers({
	decks: DecksReducer,
	activeDeck: ActiveDeckReducer
});

export default rootReducer;