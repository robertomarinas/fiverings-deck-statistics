import React from 'react';

const CardListItem = (props) => {
	return <li>{props.cardName} - {props.cardCount}</li>
}

export default CardListItem;