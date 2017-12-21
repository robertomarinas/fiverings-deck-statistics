import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDeck } from '../actions/index';

class ImportBar extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			perma: '' ,
			exists: false
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({ perma: event.target.value });
	}

	onFormSubmit(event) {
		event.preventDefault();
		// console.log(this.props.decks);
		// console.log(this.state.perma);
		// Check if the deck is already imported
		// this.props.decks.forEach(function(deck) {
		// 	console.log(deck.record.id);
		// 	if(deck.record.id == this.state.perma) {
		// 		this.setState({ exists: true });
		// 		console.log('already exists');
		// 	}
		// });

		this.props.fetchDeck(this.state.perma);
		// comment uncomment this
		this.setState({ perma: '' });
	}

	onCheckPerma() {
		// console.log(1);
		// return 'test';
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="import-form input-group">
				<input 
				className="form-control" 
				onChange={this.onInputChange} 
				placeholder="Enter permalink ID (e.g. d7c244ae-d362-11e7-86fc-8e1ccf16fca4)" 
				value={this.state.perma} />
				
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Fetch Deck</button>
				</span>
			</form>

		) 

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchDeck }, dispatch);
}

function mapStateToProps(state) {
	return {
		decks: state.decks
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportBar);