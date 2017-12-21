import React from 'react';

const ItemPanelHead = (props) => {

	if(props.count == 0) {
		return null;
	}

	return (
		<div className="panel panel-default">
		  <div className="panel-heading">
		  	<h2 className="panel-title">{props.head} ({props.count})</h2>
		  </div>
		</div>
	);

}

export default ItemPanelHead;