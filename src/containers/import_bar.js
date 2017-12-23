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
		this.props.fetchDeck(this.state.perma);
		this.setState({ perma: '' });
	}

	render() {

		return (
			<div>
				<div className="" style={{color: '#F00', fontStyle: 'italic'}}>{this.props.decks.status}</div>
				<form onSubmit={this.onFormSubmit} className="import-form input-group" style={{}}>

					<input 
					className="form-control" 
					onChange={this.onInputChange} 
					placeholder="Enter permalink ID (e.g. d7c244ae-d362-11e7-86fc-8e1ccf16fca4)" 
					value={this.state.perma} 
					disabled={Object.keys(this.props.cards).length === 0 ? 'disabled' : this.props.cards.error ? 'disabled' : ''}
					/>
					
					<span className="input-group-btn">
						<button type="submit" className="btn btn-secondary">Fetch Deck</button>
					</span>
				</form>

			</div>
		) 

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchDeck }, dispatch);
}

function mapStateToProps(state) {
	return {
		decks: state.decks,
		cards: state.cardsList
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportBar);