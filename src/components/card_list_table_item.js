import React from 'react';

const CardListTableItem = (props) => {

	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.count}</td>
		</tr>
	)

}

export default CardListTableItem;