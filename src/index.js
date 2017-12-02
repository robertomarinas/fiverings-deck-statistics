/*
    ./client/index.js
    which is the webpack entry file
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

import ImportBar from './components/import_bar';
import CardList from './components/card_list';
import CurveDiagram from './components/curve_diagram';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			deck: [],
			status: '' 
		}
		// this.state = { status: '' }
	}

	permaSearch = (perma) => {
	
		fetch('https://api.fiveringsdb.com/strains/'+ perma).then((res) => {
			if(res.status == 404) {
				this.setState({status: 'invalid'});
				this.setState({deck: []});
			} else {
				this.setState({status: 'valid'});
				return res.json();	
			}			
		})
		.then((jsonObj) => {
			console.log(jsonObj);

			const deck = jsonObj.record.head.cards;
			
			this.setState({deck: Object.entries(deck)});
			console.log(this.state.deck)
		
		});
	}

	render() {
		return (
			<div>
				<div className="center">
					<h1>L5R Deck Statistics</h1>
					<ImportBar onPermaChange={perma => this.permaSearch(perma)} />
					<CurveDiagram />
				</div>
				<CardList curDeck={this.state.deck} />
				{this.state.status}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));