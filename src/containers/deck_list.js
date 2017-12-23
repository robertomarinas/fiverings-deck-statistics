import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';
import { bindActionCreators } from 'redux';
import { fetchCardsList } from '../actions/index';
import { fetchFateCost } from '../actions/index';
import CardListTable from '../components/card_list_table';
import ItemPanelHead from '../components/item_panel_head';
import ItemPanel from '../components/item_panel';
import ItemPanelDeckList from '../components/item_panel_deck_list';
import ItemPanelCurve from '../components/item_panel_curve';
import ItemPanelCalculator from '../components/item_panel_calculator';
import CurveDiagram from '../components/curve_diagram';
import ValidationAlertDiv from '../components/validation_alert_div';
import FetchNotification from '../components/fetch_notification';

class DeckList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			selected: null,
			selectedID: null,
			optimizedCardsList: [],
			optimizedDeckList: [],
			optimizedDynastyList: [],
			optimizedConflictList: [],
			currentDynastyCount: 0,
			currentConflictCount: 0,
			curve: {
				zero: 0,
				one: 0,
				two: 0,
				three: 0,
				four: 0,
				five: 0
			},
			noCost: 0,
			id: '',
			copies: '',
			numDraws: '',
			numSucDraws: '',
			deckCount: '',
			// '' or []
			calcRes: '',
			// if they're exceeding their natural count
			ifCopies: '',
			ifDraws: '',
			ifDeckCount: '',
			ifEmptyFields: '',
			fetchStatus: false
		}

		// For Probability Calculator
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onViewDeck = this.onViewDeck.bind(this);

		this.onMultipleDraws = this.onMultipleDraws.bind(this);
		this.onGetProbability = this.onGetProbability.bind(this);
	}

	componentWillMount() {
		this.props.fetchCardsList();
		// console.log('fetching cards now');
	}

	onViewDeck(e){

		if(!this.props.cards.hasOwnProperty('records')) {
			console.log('Card Database is still being loaded');
		}
	
		const index = parseInt(e.target.dataset.index);
		const key = e.target.dataset.key;

		// Clean States
		this.setState({ currentDynastyCount: null });
		this.setState({ currentConflictCount: null });
		this.setState({
			curve: {zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0}
		});
		
		// set State to the selected ID
		this.setState({ selectedID: key });

		let fateCost =  [];
		let newDeckArr = [];
		
		const cardLibrary = this.props.cards;
		console.log(cardLibrary);

		cardLibrary.records.forEach((value) => {

			// if(value.type != "holding" || value.type != "province" || value.type != "stronghold") {
				// fateCost.card = fateCost.card.concat({ id: value.id, cost: value.cost } );	
				// Object.assign(fateCost.card, [fateCost.card[key] = value, ...fateCost.card]);
				// fateCost[ value.id ] = value.cost;
				fateCost[ value.id ] = { cost: value.cost, type: value.type, side: value.side };
				// fateCost = fateCost.concat({ id: value.id, cost: value.cost, side: value.side })
			// }
		});

		console.log(fateCost);

		this.setState({optimizedCardsList: fateCost});

		const selectedDeck = Object.entries(this.props.decks.list[index].record.head.cards);

		selectedDeck.map(value => {
			newDeckArr = newDeckArr.concat({ id: value[0], count: value[1] });	
		});
		
		// Toggle Active DeckList

		this.setState({ optimizedDeckList: newDeckArr });

		// Get All of the Data
		this.onGetAllData(newDeckArr, fateCost, this.onGetCost, this.onGetDeckCount);
	}

	onGetCost = (cardId, cardCount, cardsList) => {

		switch (cardsList[cardId].cost) {

			case 0:
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        zero: prevState.curve.zero + cardCount
				    }
				}));
				break;

			case 1: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        one: prevState.curve.one + cardCount
				    }
				}));
				break;

			case 2: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        two: prevState.curve.two + cardCount
				    }
				}));
				break;

			case 3: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        three: prevState.curve.three + cardCount
				    }
				}));
				break;

			case 4: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        four: prevState.curve.four + cardCount
				    }
				}));
				break;

			case 5: 
			case 6: 
			case 7: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        five: prevState.curve.five + cardCount
				    }
				}));
				break;

			default:
				this.setState((prevState) => ({
					noCost: prevState.noCost + cardCount
				}));

		}

	}

	onGetDeckCount = (id, count, cardsList) => {

		switch (cardsList[id].side) {
			case "dynasty":
				console.log('dynasty');
				this.setState((prevState) => ({
					currentDynastyCount: prevState.currentDynastyCount + count
				}));
			break;

			case "conflict":
				this.setState((prevState) => ({
					currentConflictCount: prevState.currentConflictCount + count
				}));
			break;
		}

	}

	onGetAllData = (cardsOfDeck, allOfCards, getCostFn, getDeckCountFn) => {
		cardsOfDeck.map((card) => {
			getCostFn(card.id, card.count, allOfCards);
			getDeckCountFn(card.id, card.count, allOfCards);
		});
	}

	// FORM Functions

	onMultipleDraws(copies, draws, sucDraws, deckCount, probFn) {

		for(draws; draws > 0; draws--) {
			probFn(copies, draws, deckCount);

			if(sucDraws > 0) {
				this.setState((prevState) => ({
					copies: prevState.copies - 1
				}));
				this.setState((prevState) => ({
					numSucDraws: prevState.numSucDraws - 1
				}));	
			}

			this.setState((prevState) => ({
				deckCount: prevState.deckCount - 1
			}));
			
		}

	}

	onGetProbability(remainingCopy, remainingDeckCount) {

		const curResult = this.state.calcRes;
		let result;

		this.setState((prevState) => ({
			calcRes: [ (remainingCopy / remainingDeckCount), ...prevState.calcRes ]
		}));
	}

	onGetCalcRes() {
		const prob = this.state.calcRes;
		const reducer = (accumulator, currentValue) => accumulator * currentValue;

		prob.reduce(reducer);
	}

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
				ifEmptyFields: 'Please fill up all the fields'
			});
		}
		if(copies > 3) {
			flag = true;
			this.setState({
				ifCopies: 'Limit for Copies is 3'
			});
		} 
		if(draws > deckCount) {
			flag = true;
			this.setState({
				ifDraws: 'Draws cannot be greater than deck count'
			});
		} else if(draws > 45) {
			flag = true;
			this.setState({
				ifDraws: 'Draws cannot exceed the max deck size of 45'
			});
		}
		if(deckCount > 45) {
			flag = true;
			this.setState({
				ifDeckCount: 'Max deck size is 45'
			});
		} 

		if(!flag) {
			const result = parseFloat((copies / deckCount) * draws).toFixed(2);

			this.setState({
				calcRes: `${result} out of ${draws} draws`
			});
		}
	}
	
	render() {
		return (
			<div className="row">

				<div className="col-sm-4 col-md-3 col-lg-2">
					<ItemPanelDeckList decks={this.props.decks} type="deckList" selected={this.state.selectedID} onViewDeck={this.onViewDeck}  />
					<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} type="clan" type2="stronghold" cardList={this.state.optimizedCardsList} selected={this.state.selectedID}  />
					<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} type="province" type2="province" cardList={this.state.optimizedCardsList} selected={this.state.selectedID}  />
				</div>
				<div className="col-sm-8 col-md-6 col-lg-6">
				<FetchNotification decks={this.props.decks} cards={this.props.cards} />
					<div className="row">
						<div className="col-sm-6">
							<ItemPanelHead decks={this.props.decks} head="dynasty" count={this.state.currentDynastyCount} />
							<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} selected={this.state.selectedID} cardList={this.state.optimizedCardsList} type="dynasty" type2="character" />
							<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} selected={this.state.selectedID} cardList={this.state.optimizedCardsList} type="dynasty" type2="holding" />
						</div>
						<div className="col-sm-6">
							<ItemPanelHead decks={this.props.decks} head="conflict" count={this.state.currentConflictCount} />
							<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} selected={this.state.selectedID} cardList={this.state.optimizedCardsList} type="conflict" type2="event" />
							<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} selected={this.state.selectedID} cardList={this.state.optimizedCardsList} type="conflict" type2="attachment" />
							<ItemPanel decks={this.props.decks} deck={this.state.optimizedDeckList} selected={this.state.selectedID} cardList={this.state.optimizedCardsList} type="conflict" type2="character" />
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-3 col-lg-4">
					<ItemPanelCurve curve={this.state.curve} id={this.state.selectedID} />
					<ItemPanelCalculator deck={this.state.optimizedDeckList} onHandleSubmit={this.handleSubmit} onHandleChange={this.handleChange} ifEmptyFields={this.state.ifEmptyFields} copies={this.state.copies} ifCopies={this.state.ifCopies} numDraws={this.state.numDraws} ifDraws={this.state.ifDraws} deckCount={this.state.deckCount} ifDeckCount={this.state.ifDeckCount} calcRes={this.state.calcRes} />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {

	return {
		decks: state.decks,
		cards: state.cardsList
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchCardsList, fetchFateCost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);