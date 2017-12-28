import React from 'react';
import FaSpinner from './fa_spinner';

const FetchNotification = (props) => {

	if(props.decks.list.length > 0) {
		return null;
	}

	let loadMsg;
	if(!props.cards.statusText) {	
		loadMsg = <p><strong>Please wait</strong> for the cards to be <strong>fetched.</strong> <FaSpinner /></p>;
	} else {
		loadMsg = props.cards.statusText;
	}

	return (
		<div className="panel panel-default alert alert-info" role="alert" style={{	textAlign: 'center'	}}>{loadMsg}</div>
	)

}

export default FetchNotification;