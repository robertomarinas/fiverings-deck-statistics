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
		return <input onChange={this.onInputChange} value={this.state.perma} />
	}
}

export default ImportBar;