import { combineReducers } from 'redux';
import DecksReducer from './reducer_decks';
import CardsListReducer from './reducer_cards_list';
import FetchCardRulings from './reducer_card_rulings';

const rootReducer = combineReducers({
	decks: DecksReducer,
	cardsList: CardsListReducer,
	cardRulings: FetchCardRulings
});

export default rootReducer;