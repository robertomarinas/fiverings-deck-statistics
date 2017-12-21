import React from 'react';

const ItemPanelDeckList = (props) => {

	const panelType = "Deck List:";
	const listGroupItem = props.decks.map((deck, index) => {
		const ifActive = props.selected == deck.record.id ? 'active' : '';
		const itemClass = `list-group-item ${ifActive}`
		return <button data-key={deck.record.id} data-index={index} className={itemClass} key={deck.record.id} onClick={props.onViewDeck}>{deck.record.head.name}</button>
	});


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