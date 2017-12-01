import React, { Component } from 'react';

const CardList = (props) => {

	console.log(props);

	const deckList = props.deck.map((card) => {
		console.log(card);
	});
	
	return(
		<div>
			{deckList}
		</div>
	)
	


}

export default CardList;
