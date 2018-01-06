import React, { Component } from 'react';
import _ from 'lodash';

const ItemPanel = (props) => {

	if(props.deck.length == 0) {
		return null;
	}
	// Current Mode of Website (view/track)
	const mode = props.mode;

	// IF toggle site mode (view/track)
	const deckSelected = mode ? props.trackDeck : props.deck;

	let listGroupItem = [];
	let panelType = null;
	let flag = false;
	let deckObj;
	let idPanel;
	
	if(props.type && props.type2) {
		idPanel = `${props.type}-${props.type2}`;
	} else {
		idPanel = `${props.type}`;
	}

	switch (true) {

		case props.type == 'clan':
			panelType = 'Clan:';
			
			const clanInfo = props.decks.list.map((deck, index) => {
				if(deck.urlType === 'strains') {
					deckObj = deck.record.head;
				} else if(deck.urlType === 'decks') {
					deckObj = deck.record;
				}
				
				if(deck.record.id === props.selected) {
					return (
						<div key={index}>
							<button className="list-group-item" disabled>{deckObj.primary_clan}</button>
							<button className="list-group-item" disabled>{deckObj.format}</button>
						</div>
					)
				}
			});

			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].type == props.type2 || props.cardList[deck.id].type == 'role') {
					return <button key={index} data-key={deck.id} onClick={props.onViewItemModal} className="list-group-item">{props.cardList[deck.id].name}</button>
				}
			});

			
			listGroupItem = [ listGroupItem, ...clanInfo ];

		break;

		case props.type == 'province':

			panelType = props.type2;

			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].side == props.type && props.cardList[deck.id].type == props.type2) {
					return <button key={index} data-key={deck.id} onClick={props.onViewItemModal} className="list-group-item">{props.cardList[deck.id].name}</button>
				}
			});

		break;

		case props.type != null && props.type2 != null:

			let typeCount = 0;
			let typePercent;
			let classes;
			let icon;
			listGroupItem = deckSelected.map((deck, index) => {
				if(props.cardList[deck.id].side == props.type && props.cardList[deck.id].type == props.type2) {
					typeCount += deck.count;
					typePercent = ((typeCount / props.count) * 100).toFixed(2);

					panelType = `${props.type2} (${typeCount}) (${typePercent}%)`;

					// Get icons
					switch (props.cardList[deck.id].clan) {
						case 'neutral':
							icon = 'icon-clan-neutral';
						break;
						case 'lion':
							icon = 'icon-clan-lion';
						break;
						case 'crane':
							icon = 'icon-clan-crane';
						break;
						case 'unicorn':
							icon = 'icon-clan-unicorn';
						break;
						case 'scorpion':
							icon = 'icon-clan-scorpion';
						break;
						case 'dragon':
							icon = 'icon-clan-dragon';
						break;
						case 'phoenix':
							icon = 'icon-clan-phoenix';
						break;
						case 'crab':
							icon = 'icon-clan-crab';
						break;
					}
					classes = `${icon} list-group-item`;

					if(!mode) {
						return <button id={deck.id} key={index} data-key={deck.id} onClick={props.onViewItemModal} className={classes}>{props.cardList[deck.id].name} ({deck.count})</button>	
					} else {
						return (
							// add .toFixed(1) || _.round() !?
							<div key={index}>
								<button type="button" onClick={props.onCardDecrement} data-key={deck.id} className="fa fa-minus"></button>
								{props.cardList[deck.id].name} <span>({deck.count})</span> <strong>{((deck.count / props.count)*100).toFixed(1)}%</strong>
								<button type="button" onClick={props.onCardIncrement} data-key={deck.id} className="fa fa-plus"></button>
							</div>
						)
					}
					
				} 
			});

			if(typeCount === 0) {
				flag = true;
			}

		break;
	}
	
	if(!flag) {
		if((mode && props.type === 'clan') || (mode && props.type === 'province')) {
			return null;
		} else {
			return(
				<div className="item">
		    		<div className="panel panel-default">
					  <div className="panel-heading">
					  	<h2 className="panel-title">{panelType} <button onClick={props.onTogglePanel} id={idPanel} className="fa fa-toggle-on" aria-hidden="true"></button></h2>
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
	} else {
		return null;
	}
}

export default ItemPanel;