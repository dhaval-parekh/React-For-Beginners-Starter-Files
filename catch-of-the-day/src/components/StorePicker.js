import React from 'react';

import { getFunName } from '../helpers';

class StorePicker extends React.Component {

	inputStore = React.createRef();

	componentDidMount() {

	}

	render() {
		return (
			<form className="store-selector" onSubmit={ this.goToStore }>
				<h2>Please enter store name</h2>
				<input ref={ this.inputStore } type="text" required placeholder="Store name"
					   defaultValue={ getFunName() }/>
				<button type="submit">Visit Store</button>
			</form>
		);
	}

	goToStore = ( event ) => {

		// 1. Stop form from submitting.
		event.preventDefault();

		// 2. Get text from the text.

		// 3. Change the page to /store/:store-name
		this.props.history.push( `/store/${ this.inputStore.current.value }` )

	}

}

export default StorePicker;
