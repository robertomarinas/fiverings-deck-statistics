import React from 'react';

const ModalContent = (props) => {

	if(props.cardId === null || props.cardsList === null) {
		return null;
	}

	let cardArr = [];

	if(props.cardsList && props.cardId) {
		cardArr = Object.entries(props.cardsList[props.cardId]);
	}

	const cardInfo = cardArr.map((value, index) => {

		let data;
		switch (value[0]) {
			case 'img':
				data = <img src={value[1]} className="img-responsive" />;
			break;
			default:
				data = value[1];
			break;
		}

		return (
			<tr key={index}>
				<td>{value[0]}</td>
				<td>{data}</td>
			</tr>
		)
	});

	return (
		<table className="table table-responsive">
			<thead></thead>
			<tbody>
				{cardInfo}
			</tbody>
		</table>
	)

}

export default ModalContent;