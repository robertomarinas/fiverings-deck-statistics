import React from 'react';

const ItemPanelDeckList = (props) => {
	
	const panelType = "Deck List:";
	let listGroupItem;
	let deckObj;
	const idPanel = `${props.type}`;

	if(props.decks.list.length === 0) {
		listGroupItem = <div className="panel panel-default alert alert-info"><strong>Decks</strong> will be displayed here. <strong>Click on it</strong> after you successfully imported a <strong>deck</strong>.</div>;
	} else {
		listGroupItem = props.decks.list.map((deck, index) => {
			if(deck.urlType === 'strains') {
				deckObj = deck.record.head;
			} else if(deck.urlType === 'decks') {
				deckObj = deck.record;
			}

			const ifActive = props.selected == deck.record.id ? 'active' : '';
			const itemClass = `list-group-item ${ifActive}`
			return <button data-key={deck.record.id} data-index={index} className={itemClass} key={deck.record.id} onClick={props.onViewDeck}>{deckObj.name}</button>
		});
	}

	return (

		<div className="item">
    		<div className="panel panel-default">
			  <div className="panel-heading">
			  	<h2 className="panel-title">{panelType} <button onClick={props.onTogglePanel} id={idPanel} className="fa fa-toggle-on" aria-hidden="true"></button></h2>
			  </div>
			  <div className="panel-body" style={{ maxHeight: 400, overflow: 'auto', overflowX: 'hidden' }}>
			    <div className="list-group">
			    	{listGroupItem}
			    </div>
			  </div>
			</div>
    	</div>

	);

}

export default ItemPanelDeckList;