import React, { Component } from 'react';
import CardListItem from './card_list_item';

const CardList = (props) => {

	const deckList = props.curDeck.map((value, index) => {
		return <CardListItem key={index} cardName={value[0]} cardCount={value[1]} />
	});
	
	return(
		<div className="row">
			<div className="">
				<ol className="deck-list">
					{deckList}
				</ol>
			</div>
		</div>
	)
}

export default CardList;
