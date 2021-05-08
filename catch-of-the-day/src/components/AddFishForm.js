import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

	static propTypes = {
		addFish: PropTypes.func,
	}

	inputRefs = {
		name: React.createRef(),
		price: React.createRef(),
		status: React.createRef(),
		desc: React.createRef(),
		image: React.createRef(),
	};

	render() {

		return (
			<form className="fish-edit" onSubmit={ this.createFish }>
				<input type="text" name="name" placeholder="Name" ref={ this.inputRefs.name }/>
				<input type="text" name="price" placeholder="Price" ref={ this.inputRefs.price }/>
				<select name="status" ref={ this.inputRefs.status }>
					<option value="available">Fresh !</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" placeholder="Description" ref={ this.inputRefs.desc }/>
				<input type="text" name="image" placeholder="Image" ref={ this.inputRefs.image }/>
				<button type="submit">+ Add Fish</button>
			</form>
		);

	}

	createFish = ( event ) => {
		event.preventDefault();

		const fish = {};

		for ( const index in this.inputRefs ) {
			fish[ index ] = this.inputRefs[ index ].current.value || '';
		}

		fish.price = parseFloat( fish.price );

		this.props.addFish( fish );

		event.currentTarget.reset();

	}
}

export default AddFishForm;
