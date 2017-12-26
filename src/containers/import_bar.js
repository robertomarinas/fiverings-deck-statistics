import React, { Component } from 'react';

class ImportBar extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			perma: '' ,
			// type: '',
			exists: false
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		let id = event.target.value.trim();

		this.setState({ perma: id });
	}

	onFormSubmit(event) {
		event.preventDefault();
		let id;
		let type;
		const perma = this.state.perma;
		const segments = perma.split('/');

		if (segments.length === 6) {
			if(segments[4].length === 36) {
				id = segments[4].toString();
				type = segments[3].toString();
			}
		}
		this.props.fetchDeck(id, type);
		this.setState({ perma: '' });
	}

	render() {

		return (
			<div>
				<div className="" style={{color: '#F00'}}>{this.props.decks.status}</div>
				<form onSubmit={this.onFormSubmit} className="import-form input-group" style={{}}>

					<input 
					className="form-control" 
					onChange={this.onInputChange} 
					placeholder="" 
					value={this.state.perma} 
					disabled={this.props.cards.status === 200 ? '' : 'disabled'}
					/>
					
					<span className="input-group-btn">
						<button type="submit" className="btn btn-default"><strong>Import Deck</strong></button>
					</span>
				</form>

			</div>
		) 

	}
}

export default ImportBar;