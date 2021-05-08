import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Fish extends React.Component {

	static propTypes = {
		details: PropTypes.shape( {
			name: PropTypes.string,
			image: PropTypes.string,
			desc: PropTypes.string,
			status: PropTypes.string,
			price: PropTypes.number,
		} ),
		addToOrder: PropTypes.func,
	}

	handleAddToCart = () => {
		this.props.addToOrder( this.props.index )
	}

	render() {

		const details = this.props.details;
		const isAvailable = ( 'available' === details.status );

		return (
			<li className="menu-fish">
				<img src={ details.image } alt={ details.name }/>
				<h3 className="fish-name">
					{ details.name }
					<span className="price">{ formatPrice( details.price ) }</span>
				</h3>
				<p>{ details.desc }</p>
				<button disabled={ ! isAvailable } onClick={ this.handleAddToCart }>
					{ isAvailable ? 'Add to cart' : 'Sold out' }
				</button>
			</li>
		);

	}

}

export default Fish;
