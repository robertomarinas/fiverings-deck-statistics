import React from 'react';

const ModalContent = (props) => {

	if(props.cardId === null || props.cardsList === null) {
		return null;
	}

	let cardArr = [];

	if(props.cardsList && props.cardId) {
		cardArr = Object.entries(props.cardsList[props.cardId]);
	}

	let title;
	const cardInfo = cardArr.map((value, index) => {
		let key;
		let data;
		switch (value[0]) {
			case 'image':
				data = <img src={value[1]} className="img-responsive" />;
				return (
					<tr key={index}>
						<td>{value[0]}</td>
						<td>{data}</td>
					</tr>
				)
			break;
			case 'cost':
				if(value[1] !== undefined) {
					key = value[0];

					return (
						<tr key={index}>
							<td>{key}</td>
							<td>{value[1]}</td>
						</tr>
					)
				}
			break;
			case 'traits':

				if(value[1].length !== 0) {
					key = value[0];
					data = value[1];

					const traits = data.map(val => {
						return <span key={val} style={{ paddingRight: '10px' }}>(<strong>{val}</strong>)</span>
					})

					return (
						<tr key={index}>
							<td>{key}</td>
							<td>{traits}</td>
						</tr>
					)
				}
			break;
			case 'name':
				title = value[1];
			break;
			default:
				key = value[0];
				data = value[1];

				return (
					<tr key={index}>
						<td>{key}</td>
						<td>{data}</td>
					</tr>
				)
			break;
		}
	});

	return (
		<div>
			<h3>{title}</h3>
			<table className="table table-responsive">
				<thead></thead>
				<tbody>
					{cardInfo}
				</tbody>
			</table>
		</div>
	)
}

export default ModalContent;