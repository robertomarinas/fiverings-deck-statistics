import { combineReducers } from 'redux';
import DecksReducer from './reducer_decks';
import CardsListReducer from './reducer_cards_list';
import FetchCardInfo from './reducer_card_info';

const rootReducer = combineReducers({
	decks: DecksReducer,
	cardsList: CardsListReducer,
	cardInfo: FetchCardInfo
});

export default rootReducer;