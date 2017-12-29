import React from 'react';

const CardRulings = (props) => {

	let rulings;

	if(!props.ifShowRuling) {
		return <a href="#" data-id={props.cardId} onClick={props.onViewRulings}>view rulings</a>;	
	} else {
		if(props.cardRulings.hasOwnProperty('records')) {

			if(props.cardRulings.records.length > 0) {
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
			} else {
				rulings = <strong>No rulings available for this card.</strong>;
			}
			
		} 
	}

	return (
		<div>
			{props.ifFetchRuling ? <span className="fa fa-spinner fa-spin"></span> : ''}
			{rulings}
			
		</div>
	)
}

export default CardRulings;