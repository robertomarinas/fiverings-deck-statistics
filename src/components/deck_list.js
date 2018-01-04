import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';
import CardListTable from './card_list_table';
import ItemPanelHead from './item_panel_head';
import ItemPanel from './item_panel';
import ItemPanelDeckList from './item_panel_deck_list';
import ItemPanelCurve from './item_panel_curve';
import ItemPanelCalculator from './item_panel_calculator';
import CurveDiagram from './curve_diagram';
import ValidationAlertDiv from './validation_alert_div';
import FetchNotification from './fetch_notification';

class DeckList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			selected: null,
			id: '',
			copies: '',
			numDraws: '',
			numSucDraws: '',
			deckCount: '',
			calcRes: '',
			ifCopies: '',
			ifDraws: '',
			ifDeckCount: '',
			ifEmptyFields: '',
			fetchStatus: false			
		}

		// For Probability Calculator
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// For Track Mode
		this.cardIncrement = this.cardIncrement.bind(this);
		this.cardDecrement = this.cardDecrement.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		// Currently Selected Deck Array
		// nextProps.optimizedDeckList;
		// Currently Selected Curve Object of Deck
		// nextProps.curve;
		// if(nextProps.toggleMode === true){
		// 	this.setTrackCurve(nextProps.curve);
		// 	// Make Copy of Selected Deck to Track
		// 	this.setTrackDeck(nextProps.optimizedDeckList);
		// }
	}

	// Track Mode Fns
	// After Each Increment/Decrement, re-count deck size based on 
	// trackSelectedDeck State(Copy of OptimizedDeckList), 
	// re-count trackCurve State(Copy of curve state)
	// DO NOT INCLUDE Strongholds, Provinces and Roles to Deck Count!
	cardIncrement(e) {
		e.preventDefault();

		// console.log(e.target);
		// Fns required to track deck
		// this.props.onGetCost(cardId, cardCount, cardsList)
		// this.props.onGetDeckCount(id, count, cardsList)
		// this.props.onGetAllData(cardsOfDeck, allOfCards, getCostFn, getDeckCountFn)


	}

	cardDecrement(e) {
		e.preventDefault();

		const cardId = e.target.dataset.key;

		// Fns required to track deck
		// this.props.onGetCost(cardId, cardCount, cardsList)
		// this.props.onGetDeckCount(id, count, cardsList)
		// this.props.onGetAllData(cardsOfDeck, allOfCards, getCostFn, getDeckCountFn)
		const deckSelected = this.props.trackSelectedDeck;
		const allOfCards = this.props.optimizedCardsList;
		const getCostFn = this.props.onGetCost;
		const getDeckCountFn = this.props.onGetDeckCount;

		this.props.editTrackDeck(deckSelected, cardId);
	}

	// editTrackDeck(deckSelected, cardId) {
	// 	 deckSelected.map(card => {
	// 	 	if(card.id === cardId) {

	// 	 	}
	// 	 })
	// }

	// FORM Handles

	handleChange(e) {

		const name = e.target.name;
		const regEx = /[^0-9]/;
		const regTest = regEx.test(e.target.value);		

		switch (name) {
			case 'id':

				this.setState({
					[name]: e.target.value
				});

			break;

			default:

				if(!regTest) {
					this.setState({
						[name]: e.target.value
					});
				}

			break;
		}
	}

	handleSubmit(e) {

		e.preventDefault();

		this.setState({ calcRes: '' });

		let copies = parseInt(this.state.copies);
		let draws = parseInt(this.state.numDraws);
		let sucDraws = parseInt(this.state.numSucDraws);
		let deckCount = parseInt(this.state.deckCount);
		// for form validation
		let flag;

		this.setState({ ifEmptyFields: ''});
		this.setState({ ifCopies: '' });
		this.setState({ ifDraws: '' });
		this.setState({ ifDeckCount: '' });

		if(!copies || !draws || !deckCount) {
			flag = true;
			this.setState({
				ifEmptyFields: 'Please fill up all the fields.'
			});
		}
		if(copies > deckCount) {
			flag = true;
			this.setState({
				ifCopies: 'Copies cannot be greater than deck size.'
			});
		} else if(copies > 45) {
			flag = true;
			this.setState({
				ifCopies: 'Copies cannot exceed the max deck size of 45.'
			});
		}
		if(draws > deckCount) {
			flag = true;
			this.setState({
				ifDraws: 'Draws cannot be greater than deck size.'
			});
		} else if(draws > 45) {
			flag = true;
			this.setState({
				ifDraws: 'Draws cannot exceed the max deck size of 45.'
			});
		}
		if(deckCount > 45) {
			flag = true;
			this.setState({
				ifDeckCount: 'Max deck size is 45.'
			});
		} 

		if(!flag) {
			const result = parseFloat((copies / deckCount) * draws).toFixed(2);

			this.setState({
				calcRes: `${result} out of ${draws} draws.`
			});
		}
	}
	
	render() {
		// console.log(this.state.trackSelectedDeck);
		return (
			<div className="row">
				<div className="col-sm-4 col-md-3 col-lg-2 first-col">
					<ItemPanelDeckList onTogglePanel={this.props.onTogglePanel} decks={this.props.decks} type="deckList" selected={this.props.selectedID} onViewDeck={this.props.onViewDeck}  />
					<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} type="clan" type2="stronghold" cardList={this.props.optimizedCardsList} selected={this.props.selectedID} mode={this.props.toggleMode} />
					<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} type="province" type2="province" cardList={this.props.optimizedCardsList} selected={this.props.selectedID} mode={this.props.toggleMode} />
				</div>
				<div className="col-sm-8 col-md-6 col-lg-7 second-and-third-cols">
					<FetchNotification decks={this.props.decks} cards={this.props.cards} status={this.props.cards.status} />
					<div className="row">
						<div className="col-sm-6">
							<ItemPanelHead decks={this.props.decks} head="dynasty" count={this.props.currentDynastyCount} />
							<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="dynasty" type2="character" count={this.props.currentDynastyCount} mode={this.props.toggleMode} onCardIncrement={this.cardIncrement} onCardDecrement={this.cardDecrement} />
							<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="dynasty" type2="holding" count={this.props.currentDynastyCount} mode={this.props.toggleMode} onCardIncrement={this.cardIncrement} onCardDecrement={this.cardDecrement} />
						</div>
						<div className="col-sm-6">
							<ItemPanelHead decks={this.props.decks} head="conflict" count={this.props.currentConflictCount} />
							<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="conflict" type2="event" count={this.props.currentConflictCount} mode={this.props.toggleMode} onCardIncrement={this.cardIncrement} onCardDecrement={this.cardDecrement} />
							<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="conflict" type2="attachment" count={this.props.currentConflictCount} mode={this.props.toggleMode} onCardIncrement={this.cardIncrement} onCardDecrement={this.cardDecrement} />
							<ItemPanel onTogglePanel={this.props.onTogglePanel} onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} trackDeck={this.props.trackSelectedDeck} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="conflict" type2="character" count={this.props.currentConflictCount} mode={this.props.toggleMode} onCardIncrement={this.cardIncrement} onCardDecrement={this.cardDecrement} />
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-3 col-lg-3 fourth-col">
					<div className="row">
						<ItemPanelCurve curve={this.props.curve.dynasty} side="dynasty" id={this.props.selectedID} />
						<ItemPanelCurve curve={this.props.curve.conflict} side="conflict" id={this.props.selectedID} />
						<ItemPanelCalculator deck={this.props.optimizedDeckList} onHandleSubmit={this.handleSubmit} onHandleChange={this.handleChange} ifEmptyFields={this.state.ifEmptyFields} copies={this.state.copies} ifCopies={this.state.ifCopies} numDraws={this.state.numDraws} ifDraws={this.state.ifDraws} deckCount={this.state.deckCount} ifDeckCount={this.state.ifDeckCount} calcRes={this.state.calcRes} />
					</div>
				</div>
			</div>
		)
	}
}

export default DeckList;