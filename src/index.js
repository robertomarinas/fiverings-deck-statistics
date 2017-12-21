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
	}

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="container page-header-content">
						<div className="row">
							<div className="col-md-5"><h1>L5R: TCG Deck Statistics</h1></div>
							<div className="col-md-7">
								<ImportBar />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<DeckList />
				</div>
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