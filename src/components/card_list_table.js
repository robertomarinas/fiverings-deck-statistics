import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardListTableItem from '../components/card_list_table_item';

const CardListTable = (props) => {

	if(props.active.length == 0) {
		return null
	}

	// console.log(props.active);

	return (
		<table className="table table-hover display-deck-list">
			<thead>
				<tr>
					<th colSpan="1">Card:</th>
					<th colSpan="1">Count:</th>
				</tr>
			</thead>
			<tbody>
				{props.active.map((value, index) => <CardListTableItem key={index} name={value.id} count={value.count} />)}
			</tbody>
		</table>
	)

	

}

export default CardListTable;