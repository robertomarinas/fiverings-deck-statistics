import React, { Component } from 'react';

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
		const id = event.target.value.trim();
		this.setState({ perma: id });
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.fetchDeck(this.state.perma);
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
					placeholder="d7c244ae-d362-11e7-86fc-8e1ccf16fca4" 
					value={this.state.perma} 
					disabled={this.props.cards.status === 200 ? '' : 'disabled'}
					/>
					
					<span className="input-group-btn">
						<button type="submit" className="btn btn-secondary"><strong>Import Deck</strong></button>
					</span>
				</form>

			</div>
		) 

	}
}



export default ImportBar;