import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

import base, { firebaseApp } from '../base';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {

	static propTypes = {
		fishes: PropTypes.object,
		addFish: PropTypes.func,
		updateFish: PropTypes.func,
		deleteFish: PropTypes.func,
		addSampleFishes: PropTypes.func,
	}

	state = {
		uid: null,
		owner: null,
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged( ( user ) => {
			if ( user ) {
				this.authHandler( { user } );
			}
		} )
	}

	authenticate = ( provider ) => {
		const authProvider = new firebase.auth[ `${ provider }AuthProvider` ]();

		firebaseApp.auth().signInWithPopup( authProvider ).then( this.authHandler );

	}

	authHandler = async ( authData ) => {

		// 1. Lookup for current store in firebase database.
		const store = await base.fetch( this.props.storeID, { context: this } );

		// 2. Claim the store if there is no owner.
		if ( ! store.owner ) {
			await base.post( `${ this.props.storeID }/owner`, {
				data: authData.user.uid,
			} )
		}

		// 3. Update the state of the component.

		this.setState( {
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid,
		} )

	};

	logout = async () => {

		await firebase.auth().signOut();

		this.setState( { uid: null } );
	}

	render() {

		const logout = <button onClick={ this.logout }>Logout</button>

		// 1. Check if user is logged in.
		if ( ! this.state.uid ) {
			return <Login authenticate={ this.authenticate }/>;
		}

		// 2. Check if user is owner of the store or not.
		if ( this.state.uid !== this.state.owner ) {
			return <div>
				<p>Sorry, You are not owner of the store.</p>
			</div>
		}

		// 3. User must be the owner.
		return (
			<div className="inventory">
				<h2>Inventory !!</h2>
				{ logout }
				{
					Object.keys( this.props.fishes ).map( ( key ) => {
						return <EditFishForm
							key={ key }
							index={ key }
							fish={ this.props.fishes[ key ] }
							updateFish={ this.props.updateFish }
							deleteFish={ this.props.deleteFish }
						/>

					} )
				}
				<AddFishForm addFish={ this.props.addFish }/>
				<button onClick={ this.props.addSampleFishes }>Add Sample Fishes</button>
			</div>
		);

	}
}

export default Inventory;
