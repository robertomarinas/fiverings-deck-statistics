import React from 'react';

const CardRulings = (props) => {

	let rulings;

	if(!props.ifShowRuling) {
		return <a href="#" data-id={props.cardId} onClick={props.onViewRulings}>view rulings</a>;	
	} else {
		if(props.cardRulings.hasOwnProperty('records')) {
			rulings = props.cardRulings.records.map((rule, index) => {
			
				return (
					<dl key={index}>
						<dt>Source:</dt>
							<dd>{rule.source}</dd>
						<dt>Text:</dt>
							<dd>{rule.text}</dd>
					</dl>
				)
			});
		}
	}

	return (
		<div>{rulings}</div>
	)
}

export default CardRulings;