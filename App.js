import React from 'react';
import { Text } from 'react-native';
import Preloader from './application/components/Preloader';
import GuestNavigation from './application/navigations/guest';
import * as firebase from 'firebase';
import firebaseConfig from './application/utils/firebase';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			isLogged: false,
			loaded: false
		}
	}

	async componentDidMount() {
		// firebase.auth().signOut(); // Cierra sesión de firebase
		await firebase.auth().onAuthStateChanged(user => {
			if (user !== null) {
				this.setState({
					isLogged: true,
					loaded: true
				});
			} else {
				this.setState({
					isLogged: false,
					loaded: true
				});
			}
		});
	}
	render() {
		console.log("app iniciada");
		const { isLogged, loaded } = this.state;
		if (!loaded) {
			return (<Preloader/>);
		}
		if (isLogged) {
			return (<Text>Logueado</Text>);
		} else {
			return (
				<GuestNavigation />
			);
		}


	}
}