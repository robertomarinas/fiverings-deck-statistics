import React, { Component } from 'react';

const ItemPanel = (props) => {
// class ItemPanel extends Component {

	// console.log(props.decks);

	if(props.deck.length == 0) {
		return null;
	}

	let listGroupItem = [];
	let panelType = null;
	let clanInfo = [];

	// OR switch (true) {

	// 	case props.type == "deckList":

	switch (true) {

		case props.type == 'deckList':
			panelType = "Deck List:";
			listGroupItem = props.decks.map((deck, index) => {
				const ifActive = props.selected == deck.record.id ? 'active' : '';
				const itemClass = `list-group-item ${ifActive}`
				return <button data-key={deck.record.id} data-index={index} className={itemClass} key={deck.record.id} onClick={props.onViewDeck}>{deck.record.head.name}</button>
			});

		break;

		case props.type == 'clan':
			panelType = 'Clan:';
			clanInfo = props.decks.map((deck, index) => {
				return (
					<div key={index}>
						<button className="list-group-item">{deck.record.head.primary_clan}</button>
						<button className="list-group-item">{deck.record.head.format}</button>	
					</div>
				)
			});

			listGroupItem = props.deck.map((deck, index) => {
				// console.log(props.cardList[deck.id]);
				if(props.cardList[deck.id].type == props.type2) {
					return <button key={index} className="list-group-item">{deck.id}, {deck.count}</button>
				}
			});

			
			listGroupItem = [ listGroupItem, ...clanInfo ];
			// console.log(listGroupItem);

		break;

		case props.type == 'province':

			panelType = props.type2;

			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].side == props.type && props.cardList[deck.id].type == props.type2) {
					return <button key={index} className="list-group-item">{deck.id}, {deck.count}</button>
				}
			});

		break;

		case props.type != null && props.type2 != null:

			panelType = props.type2;

			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].side == props.type && props.cardList[deck.id].type == props.type2) {
					return <button key={index} className="list-group-item">{deck.id}, {deck.count}</button>
				}
			});

		break;

		default:

			//return listGroupItem = <button className="list-group-item">N/A</button>

	}
	

	// constructor(props) {
	// 	super(props);
	// }

	
	return(
		<div className="item">
    		<div className="panel panel-default">
			  <div className="panel-heading">
			  	<h3 className="panel-title">{panelType}</h3>
			  </div>
			  <div className="panel-body">
			    <div className="list-group">
			    	{listGroupItem}
			    </div>
			  </div>
			</div>
    	</div>
	)
	
}

export default ItemPanel;