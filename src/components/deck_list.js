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
				ifEmptyFields: 'Please fill up all the fields.'
			});
		}
		if(copies > deckCount) {
			flag = true;
			this.setState({
				ifCopies: 'Cards cannot be greater than deck size.'
			});
		} else if(copies > 45) {
			flag = true;
			this.setState({
				ifCopies: 'Cards cannot exceed the max deck size of 45.'
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
		
		return (
			<div className="row">
				
				<div className="col-sm-4 col-md-3 col-lg-2">
					<ItemPanelDeckList decks={this.props.decks} type="deckList" selected={this.props.selectedID} onViewDeck={this.props.onViewDeck}  />
					<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} type="clan" type2="stronghold" cardList={this.props.optimizedCardsList} selected={this.props.selectedID}  />
					<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} type="province" type2="province" cardList={this.props.optimizedCardsList} selected={this.props.selectedID}  />
				</div>
				<div className="col-sm-8 col-md-6 col-lg-6">
				<FetchNotification decks={this.props.decks} cards={this.props.cards} status={this.props.cards.status} />
					<div className="row">
						<div className="col-sm-6">
							<ItemPanelHead decks={this.props.decks} head="dynasty" count={this.props.currentDynastyCount} />
							<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="dynasty" type2="character" count={this.props.currentDynastyCount} />
							<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="dynasty" type2="holding" count={this.props.currentDynastyCount} />
						</div>
						<div className="col-sm-6">
							<ItemPanelHead decks={this.props.decks} head="conflict" count={this.props.currentConflictCount} />
							<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="conflict" type2="event" count={this.props.currentConflictCount} />
							<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="conflict" type2="attachment" count={this.props.currentConflictCount} />
							<ItemPanel onViewItemModal={this.props.onViewItemModal} decks={this.props.decks} deck={this.props.optimizedDeckList} selected={this.props.selectedID} cardList={this.props.optimizedCardsList} type="conflict" type2="character" count={this.props.currentConflictCount} />
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-3 col-lg-4">
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