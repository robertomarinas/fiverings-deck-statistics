import React, { Component } from 'react';
import FaSpinner from '../components/fa_spinner';

class ImportBar extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			perma: '' ,
			ifFetchDeck: false,
			exists: false
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ifFetchDeck: false });
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

		if (segments.length >= 5) {
			if(segments[4].length === 36) {
				id = segments[4].toString();
				type = segments[3].toString();
			} else {
				id = perma;
			}
		} else {
			id = perma;
		}

		this.props.fetchDeck(id, type);
		this.setState({ ifFetchDeck: true });
		this.setState({ perma: '' });
	}

	render() {
		return (
			<div>
				<div style={{color: '#F00'}}>
					{this.state.ifFetchDeck ? <span className="fa fa-spinner fa-spin"></span> : this.props.decks.status}
				</div>
				
				<form onSubmit={this.onFormSubmit} className="import-form input-group" style={{}}>
					<span className="input-group-btn">
						<button type="button" className="btn btn-default"><span className="fa fa-4 fa-cog"></span></button>
					</span>
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