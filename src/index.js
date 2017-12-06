/*
    ./client/index.js
    which is the webpack entry file
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

// Components
import ImportBar from './containers/import_bar';
import CardList from './components/card_list';
import CurveDiagram from './components/curve_diagram';
// Containers
import DeckList from './containers/deck_list';
// Reducers
import reducers from './reducers';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			deck: [],
			status: '' 
		}
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
					<ImportBar />
				</div>
				<CardList curDeck={this.state.deck} />
				<DeckList />
			</div>
		)
	}
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, 
	document.getElementById('root')
);