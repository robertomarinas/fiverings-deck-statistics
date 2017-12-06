import React, { Component } from 'react';
import { connect } from 'react-redux';

class DeckList extends Component {

	renderList(deck) {

		console.log(deck);
		
		// Convert deck.cards Object to Array
		const arrCards = Object.entries(deck.record.head.cards);
		// Convert to Array and get values
		const arrCurve = Object.values(deck.record.head.cards);
		// Return both Key and Value of arrCards array
		const newArrCards = arrCards.map(function(value) {
			return (
				<tr key={value}>
					<td colSpan="1">{value[0]}</td>
					<td colSpan="1">{value[1]}</td>
				</tr>
			);
		});

		return (
			<tr key={deck.record.id}>
				<td colSpan="1">{deck.record.head.name}</td>
				<td colSpan="2" style={{padding: 0}}>
					<table className="table">
						<tbody>
							{newArrCards}
						</tbody>
					</table>
				</td>
			</tr>
		)
	}

	// onCheckProps = (e) => {
	// 	console.log(this.props.decks);
	// 	console.log(this.props.active);
	// }
	
	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="1">Deck:</th>
								<th colSpan="1">Card:</th>
								<th colSpan="1">Count:</th>
							</tr>
						</thead>
						<tbody>
							{this.props.decks.map(this.renderList)}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {

	return {
		decks: state.decks,
		active: state.activeDeck
	};
}

export default connect(mapStateToProps)(DeckList);