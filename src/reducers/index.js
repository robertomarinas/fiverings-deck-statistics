import { combineReducers } from 'redux';
import DecksReducer from './reducer_decks';
import ActiveDeckReducer from './reducer_active_deck';
import CardsListReducer from './reducer_cards_list';
import FetchCost from './reducer_fetch_cost';

const rootReducer = combineReducers({
	decks: DecksReducer,
	activeDeck: ActiveDeckReducer,
	cardsList: CardsListReducer,
	cardInfo: FetchCost
});

export default rootReducer;