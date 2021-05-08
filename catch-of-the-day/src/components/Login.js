import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {

	static propTypes = {
		authenticate: PropTypes.func.isRequired,
	};

	render() {
		return (
			<nav className='login'>
				<h2>Inventory Login</h2>
				<p>Please login to run inventory</p>
				<button className="github" onClick={ () => this.props.authenticate( 'Github' ) }>
					Login with Github
				</button>
				<button className="facebook" onClick={ () => this.props.authenticate( 'Facebook' ) }>
					Login with Facebook
				</button>
				<button className="twitter" onClick={ () => this.props.authenticate( 'twitter' ) }>
					Login with Twitter
				</button>
			</nav>
		);
	}
}

export default Login;
