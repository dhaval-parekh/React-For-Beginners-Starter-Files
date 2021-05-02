import React from 'react';

class EditFishForm extends React.Component {

	inputRefs = {
		name: React.createRef(),
		price: React.createRef(),
		status: React.createRef(),
		desc: React.createRef(),
		image: React.createRef(),
	};

	handleChange = ( event ) => {

		const updatedFish = {
			...this.props.fish,
			[ event.currentTarget.name ]: event.currentTarget.value,
		};

		this.props.updateFish( this.props.index, updatedFish );

	}

	render() {

		return (
			<div className="fish-edit">
				<input type="text" name="name" placeholder="Name" value={ this.props.fish.name }
					   onChange={ this.handleChange }/>
				<input type="text" name="price" placeholder="Price" value={ this.props.fish.price }
					   onChange={ this.handleChange }/>
				<select name="status" value={ this.props.fish.status } onChange={ this.handleChange }>
					<option value="available">Fresh !</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" placeholder="Description" value={ this.props.fish.desc }
						  onChange={ this.handleChange }/>
				<input type="text" name="image" placeholder="Image" value={ this.props.fish.image }
					   onChange={ this.handleChange }/>
				<button type="button" onClick={ () => {
					this.props.deleteFish( this.props.index )
				} }>Remove Fish
				</button>
			</div>
		);

	}

}

export default EditFishForm;
