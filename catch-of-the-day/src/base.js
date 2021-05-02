import Rebase from 're-base';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC40QNuyjzeMDcigV5MZP288ju5rDJoRE0",
	authDomain: "catch-of-the-day-af2fd.firebaseapp.com",
	databaseURL: "https://catch-of-the-day-af2fd.firebaseio.com",
	projectId: "catch-of-the-day-af2fd",
	storageBucket: "catch-of-the-day-af2fd.appspot.com",
	messagingSenderId: "312968971075",
	appId: "1:312968971075:web:29ea4bc2d83c815642e5f6",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp( firebaseConfig );

const base = Rebase.createClass( firebaseApp.database() );

export { firebaseApp };

export default base;