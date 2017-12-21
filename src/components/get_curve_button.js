import React from 'react';

const GetCurveButton = (props) => {

	console.log(props);

	if(props.selectedID == null) {
		return null;
	}

	return <button onClick={props.getCurve} value={props.selectedID}>get curve of active deck</button>

}

export default GetCurveButton;