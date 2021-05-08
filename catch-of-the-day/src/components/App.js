import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

	static propTypes = {
		match: PropTypes.object,
	}

	state = {
		fishes: {},
		order: {},
	};

	componentDidMount() {

		const params = this.props.match.params;
		this.ref = base.syncState( `${ params.storeID }/fishes`, {
			context: this,
			state: 'fishes',
		} );

		const localStorageRef = localStorage.getItem( params.storeID );

		if ( localStorageRef ) {
			this.setState( {
				order: JSON.parse( localStorageRef ),
			} );
		}

	}

	componentDidUpdate( prevProps, prevState, snapshot ) {

		const params = this.props.match.params;

		localStorage.setItem( params.storeID, JSON.stringify( this.state.order ) );
	}

	componentWillUnmount() {
		base.removeBinding( this.ref );
	}

	addSampleFishes = () => {

		this.setState( {
			fishes: sampleFishes,
		} );

	}

	addFish = ( fish ) => {

		// 1. Take fishes from current state.
		const fishes = this.state.fishes;

		// 2. Add new fish to the list.
		fishes[ `fish${ Date.now() }` ] = fish;

		// 3. Update the state.
		this.setState( { fishes: fishes } );

	}

	updateFish = ( key, updatedFish ) => {

		const fishes = this.state.fishes;

		fishes[ key ] = updatedFish;

		this.setState( { fishes } );

	}

	deleteFish = ( key ) => {

		const fishes = this.state.fishes;

		fishes[ key ] = null;

		this.setState( { fishes } );

		this.removeFromOrder( key );

	}

	addToOrder = ( key ) => {

		// 1. take a copy of state.
		const order = this.state.order || {};

		// 2. Add, update or remove the order.
		order[ key ] = order[ key ] + 1 || 1;

		// 3. Update the state
		this.setState( { order: order } );

	}

	removeFromOrder = ( key ) => {
		const order = this.state.order || {};

		delete order[ key ];

		this.setState( { order: order } );
	}

	render() {

		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="I'm cool."/>
					<ul className="fishes">
						{
							Object.keys( this.state.fishes ).map( ( key ) => {
								return <Fish
									key={ key }
									index={ key }
									details={ this.state.fishes[ key ] }
									addToOrder={ this.addToOrder }
								/>
							} )
						}

					</ul>
				</div>
				<Order
					fishes={ this.state.fishes }
					order={ this.state.order }
					removeFromOrder={ this.removeFromOrder }
				/>
				<Inventory
					fishes={ this.state.fishes }
					addFish={ this.addFish }
					updateFish={ this.updateFish }
					deleteFish={ this.deleteFish }
					addSampleFishes={ this.addSampleFishes }
				/>

			</div>
		);

	}
}

export default App;
