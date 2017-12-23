import React from 'react';

const ValidationAlertDiv = (props) => {

	if(props.type == false) {
		return null;
	}

	let addAlertClass;

	switch (props.alertType) {
		case 'fail':
			addAlertClass = 'alert-warning';
		break;

		case 'success':
			addAlertClass = 'alert-success';
		break;
	}

	const wholeAlertClass = `invalid-feedback alert ${addAlertClass}`;

	return (
		 <div className={wholeAlertClass} role="alert">{props.type}</div>
	)

}

export default ValidationAlertDiv;