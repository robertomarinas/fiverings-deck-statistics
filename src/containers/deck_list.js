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
import CurveDiagram from '../components/curve_diagram';
import GetCurveButton from '../components/get_curve_button';
import ValidationAlertDiv from '../components/validation_alert_div';

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
			one: 0,
			two: 0,
			three: 0,
			four: 0,
			five: 0,
			zero: 0,
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
			ifEmptyFields: ''
		}

		// For Probability Calculator
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.onMultipleDraws = this.onMultipleDraws.bind(this);
		this.onGetProbability = this.onGetProbability.bind(this);

		this.props.fetchCardsList();
	}

	componentDidMount() {

	}

	onViewDeck = (e) => {

		console.log(this.props.decks);

		if(!this.props.cards.hasOwnProperty('records')) {
			console.log('Card Database is still being loaded');
		}
	
		const index = parseInt(e.target.dataset.index);
		const key = e.target.dataset.key;

		// Clean States
		this.setState({ zero: null });
		this.setState({ one: null });
		this.setState({ two: null });
		this.setState({ three: null });
		this.setState({ four: null });
		this.setState({ five: null });
		this.setState({ currentDynastyCount: null });
		this.setState({ currentConflictCount: null });
		
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

		const selectedDeck = Object.entries(this.props.decks[index].record.head.cards);

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
				this.setState((prevState) => ({
					zero: prevState.zero + cardCount
				}));
				break;

			case 1: 
				this.setState((prevState) => ({
					one: prevState.one + cardCount
				}));
				break;

			case 2: 
				this.setState((prevState) => ({
					two: prevState.two + cardCount
				}));
				break;

			case 3: 
				this.setState((prevState) => ({
					three: prevState.three + cardCount
				}));
				break;

			case 4: 
				this.setState((prevState) => ({
					four: prevState.four + cardCount
				}));
				break;

			case 5: 
			case 6: 
			case 7: 
				this.setState((prevState) => ({
					five: prevState.five + cardCount
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

	onSuccessfulDraw(sucDraws) {

	}

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

					// if(this.state.[name])

					// switch (true) {
					// 	case name === 'copies' && e.target.value > 3:

					// 		this.setState({
					// 			ifCopies: 'Limit for Copies for each card is 3'
					// 		});

					// 	break;

					// 	case name === 'numDraws' && e.target.value > 3:

					// 		this.setState({
					// 			ifCopies: 'Limit for Copies for each card is 3'
					// 		});

					// 	break;

					// 	case name === 'copies' && e.target.value > 3:

					// 		this.setState({
					// 			ifCopies: 'Limit for Copies for each card is 3'
					// 		});

					// 	break;

					// 	default:

					// 		this.setState({
					// 			ifCopies: false
					// 		})

					// 	break;					
					// }
				}

			break;
		}
	}

	handleSubmit(e) {

		e.preventDefault();

		this.setState({
			calcRes: ''
		});

		let copies = parseInt(this.state.copies);
		let draws = parseInt(this.state.numDraws);
		let sucDraws = parseInt(this.state.numSucDraws);
		let deckCount = parseInt(this.state.deckCount);
		// for form validation
		let flag;

		this.setState({
			ifEmptyFields: ''
		});
		this.setState({
			ifCopies: ''
		});
		this.setState({
			ifDraws: ''
		});
		this.setState({
			ifDeckCount: ''
		});

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
		// else {
		// 	flag = false;
		// 	this.setState({
		// 		ifDeckCount: ''
		// 	});
		// }

		// switch (true) {

		// 	case !copies || !draws || !deckCount:

		// 		flag = true;
		// 		this.setState({
		// 			ifEmptyFields: 'Please fill up all the fields'
		// 		});
		// 	break;

		// 	case copies > 3:

		// 		flag = true;
		// 		this.setState({
		// 			ifCopies: 'Limit for Copies is 3'
		// 		});
		// 	// break;

		// 	case draws > deckCount:

		// 		flag = true;
		// 		this.setState({
		// 			ifDraws: 'Draws cannot be greater than deck count'
		// 		});
		// 	// break;

		// 	case deckCount > 45:
		// 		flag = true;
		// 		this.setState({
		// 			ifDeckCount: 'The limit for deck count is 45'
		// 		});
		// 	break;

		// 	default:
		// 		flag = false;
		// 		this.setState({
		// 			ifEmptyFields: ''
		// 		});
		// 		this.setState({
		// 			ifCopies: ''
		// 		});
		// 		this.setState({
		// 			ifDraws: ''
		// 		});
		// 		this.setState({
		// 			ifDeckCount: ''
		// 		});
		// 	break;
		// }
		console.log(flag);
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
					<div className="item">
						<div className="panel panel-default">
						  <div className="panel-heading">
						  	<h3 className="panel-title">Curve Chart (Fate cost)</h3>
						  </div>
						  <div className="panel-body">
						    <CurveDiagram data={[ this.state.zero, this.state.one, this.state.two, this.state.three, this.state.four, this.state.five ]} selected={this.state.selectedID} />
						    <table className="table table-responsive">
						    	<thead>
						    		<tr>
						    			<th>0</th>
							    		<th>1</th>
							    		<th>2</th>
							    		<th>3</th>
							    		<th>4</th>
							    		<th>5+</th>
						    		</tr>
						    	</thead>
						    	<tbody>
						    		<tr>
						    			<td>{this.state.zero}</td>
							    		<td>{this.state.one}</td>
							    		<td>{this.state.two}</td>
							    		<td>{this.state.three}</td>
							    		<td>{this.state.four}</td>
							    		<td>{this.state.five}</td>
						    		</tr>
						    	</tbody>
						    </table>
						  </div>
						</div>	    		
			    	</div>
			    	<div className="item">
						<div className="panel panel-default">
						  <div className="panel-heading">
						  	<h3 className="panel-title">Probability Calculator:</h3>
						  </div>
						  <div className="panel-body">
						  	 
						    <form onSubmit={this.handleSubmit} className="prob-calc-form">
						      <ValidationAlertDiv type={this.state.ifEmptyFields} alertType="fail" />
								<div className="input-group">
								  <span className="input-group-addon" id="basic-addon1">Copies:</span>
								  <input type="text" className="form-control" name="copies" onChange={this.handleChange} placeholder="3" value={this.state.copies} aria-describedby="basic-addon1" />
								  
								</div>
								<ValidationAlertDiv type={this.state.ifCopies} alertType="fail" />
								<div className="input-group">
								  <span className="input-group-addon" id="basic-addon1"># of Draws:</span>
								  <input type="text" className="form-control" name="numDraws" onChange={this.handleChange} placeholder="1" value={this.state.numDraws} aria-describedby="basic-addon1" />
								</div>
								<ValidationAlertDiv type={this.state.ifDraws} alertType="fail" />
								<div className="input-group">
								  <span className="input-group-addon" id="basic-addon1">Deck Size:</span>
								  <input type="text" className="form-control" name="deckCount" onChange={this.handleChange} placeholder="40" value={this.state.deckCount} aria-describedby="basic-addon1" />
								</div>
								<ValidationAlertDiv type={this.state.ifDeckCount} alertType="fail" />
								<div className="input-group">
								  <span className="input-group-btn">
								    <button type="submit" className="btn btn-calc-res">Calculate</button>
								  </span>
								</div>
								<ValidationAlertDiv type={this.state.calcRes} alertType="success" />
							</form>
							
						  </div>
						</div>	    		
			    	</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {

	return {
		decks: state.decks,
		cards: state.cardsList,
		loaded: state.cardsList
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchCardsList, fetchFateCost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);