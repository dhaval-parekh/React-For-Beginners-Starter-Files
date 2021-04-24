import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends React.Component {

	state = {
		fishes: {},
		order: {},
	};

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

	render() {

		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="I'm cool."/>
				</div>
				<Order/>
				<Inventory addFish={ this.addFish } addSampleFishes={ this.addSampleFishes }/>

			</div>
		);

	}
}

export default App;
