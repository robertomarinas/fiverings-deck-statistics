import React from 'react';

const ItemPanelDeckList = (props) => {
	
	const panelType = "Deck List:";
	let listGroupItem;

	if(props.decks.list.length === 0) {
		listGroupItem = <div className="alert alert-info">Your <strong>decks</strong> will be displayed here. <strong>Click on it</strong> after you successfully imported your <strong>deck</strong>.</div>;
	} else {
		listGroupItem = props.decks.list.map((deck, index) => {
			const ifActive = props.selected == deck.record.id ? 'active' : '';
			const itemClass = `list-group-item ${ifActive}`
			return <button data-key={deck.record.id} data-index={index} className={itemClass} key={deck.record.id} onClick={props.onViewDeck}>{deck.record.head.name}</button>
		});
	}

	return (

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

	);

}

export default ItemPanelDeckList;