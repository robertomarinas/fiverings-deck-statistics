/*
    ./client/index.js
    which is the webpack entry file
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

import ImportBar from './components/import_bar';
import CardList from './components/card_list';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = { deck: [] }
	}

	permaSearch = (perma) => {
	
		fetch('https://api.fiveringsdb.com/strains/'+ perma).then((results) => {
			return results.json();
		})
		.then((jsonObj) => {
			console.log(jsonObj);
			// const deck = jsonObj.map((card) => {
			// 	return card;
			// });
			// this.setState({deck: [deck]});
			// console.log(deck);

			// <CardList deck={deck} />
		});
	}

	render() {
		return (
			<div className="centralize">
				<h1 style={{textAlign: 'center'}}>L5R Deck Statistics</h1>
				<ImportBar onPermaChange={perma => this.permaSearch(perma)} />
				{this.state.deck}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('container'));