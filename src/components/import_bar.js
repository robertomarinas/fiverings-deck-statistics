import React, { Component } from 'react';

class ImportBar extends Component {

	constructor(props) {
		super(props);

		this.state = { perma: '' }
	}

	onInputChange = (e) => {
		this.setState({ perma: e.target.value });
		this.props.onPermaChange(e.target.value);
	}

	render() {
		return (
			<div>
				<input onChange={this.onInputChange} value={this.state.perma} />
				<br />
				Value of the input: {this.state.perma}			
			</div>
		)
	}
}

export default ImportBar;