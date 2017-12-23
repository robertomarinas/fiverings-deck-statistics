import React from 'react';

const FetchNotification = (props) => {

	// console.log(Object.keys(props.cards).length);

	if(props.decks.list.length > 0) {
		return null;
	}

	let loadMsg;
	if(Object.keys(props.cards).length === 0) {
		// console.log('empty');
		loadMsg = 'Please wait for the cards to be loaded..';
	} else {
		// console.log('fetched');
		// console.log(props.cards.error);
		if(props.cards.error) {
			loadMsg = props.cards.error;	
		}
		// const bold = <strong>Cards are loaded!</strong>;
		loadMsg = `Cards successfully Fetched! You can now enter your permalink ID from fiveringsdb.com`;
	}

	return (
		<div className="col-sm-12 alert alert-info" role="alert" style={{
			// width: a,
			margin: '0 auto',
			textAlign: 'center'
		}}><strong>{loadMsg}</strong></div>
	)

}

export default FetchNotification;