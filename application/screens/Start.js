import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import facebookConfig from '../utils/facebook';
import * as firebase from 'firebase';

class Start extends Component {

    static navigationOptions = {
        title: "Expo foo"
    };

    login() {
        const navigationAction = NavigationActions.navigate({
            routeName: 'Login'
        });
        this.props.navigation.dispatch(navigationAction);
    }

    register() {
        const navigationAction = NavigationActions.navigate({
            routeName: 'Register'
        });
        this.props.navigation.dispatch(navigationAction);
    }

    async facebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            facebookConfig.config.application_id,
            { permissions: facebookConfig.config.permissions }
        )
        if (type === 'success') {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInAndRetrieveDataWithCredential(credentials)
                .then()
                .catch(error => {
                    Toast.showWithGravity("Error accediendo con facebook", Toast.LONG, Toast.BOTTOM);
                });
        } else if (type === 'cancel') {
            Toast.showWithGravity("Inicio de sesión cancelado", Toast.LONG, Toast.BOTTOM);
        } else {
            Toast.showWithGravity("Error desconocido", Toast.LONG, Toast.BOTTOM);
        }
    }

    render() {
        return (
            <BackgroundImage source={require('../../assets/pattern_black.png')}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <AppButton
                        bgColor="rgba(111, 38, 74, 0.7)"
                        title="Entrar"
                        action={this.login.bind(this)}
                        iconName="vpn-lock"
                        iconSize={20}
                        iconColor="#000000"
                    />
                    <AppButton
                        bgColor="rgba(200, 200, 50, 0.7)"
                        title="Registro"
                        action={this.register.bind(this)}
                        iconName="face"
                        iconSize={20}
                        iconColor="#000000"
                    />
                    <AppButton
                        bgColor="rgba(67, 67, 146, 0.7)"
                        title="Facebook"
                        action={this.facebook.bind(this)}
                        iconName="album"
                        iconSize={20}
                        iconColor="#000000"
                    />
                </View>
            </BackgroundImage>
        );
    }
}
export default Start;