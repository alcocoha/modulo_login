import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import FormValidation from '../utils/validation';
import { card, Card } from 'react-native-elements';
const Form = t.form.Form;
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                email: "",
                password: ""
            }
        };

        this.samePassword = t.refinement(t.String, s => {
            return s === this.state.user.password;
        });

        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password,
            passwordConfirmation: this.samePassword
        });

        this.options = {
            fields: {
                email: {
                    help: 'Introduce tu email',
                    error: 'Email incorrecto',
                    autoCapitalize: 'none',
                },
                password: {
                    help: 'Introduce un password',
                    error: 'Password incorrecto',
                    password: true,
                    secureTextEntry: true,
                },
                passwordConfirmation: {
                    help: 'Repite el password',
                    error: 'Los passwords no coinciden',
                    password: true,
                    secureTextEntry: true,
                }
            }
        };

        this.validate = null;
    }

    static navigationOptions = {
        title: "Registro"
    };

    onChange (user) {
        this.setState({user});
        this.validate = this.refs.form.getValue();
    }

    register() {
        if (this.validate) {
            firebase.auth().createUserWithEmailAndPassword( this.validate.email, this.validate.password)
                .then(()=>{
                    Toast.showWithGravity("Registro correcto bienvenido", Toast.LONG, Toast.BOTTOM);
                })
                .catch(err =>{
                    Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
                })
        }
    }

    render() {
        return (
            <BackgroundImage source={require('../../assets/pattern_black.png')}>
                <View>
                    <Card wrapperStyle={{ paddingLeft: 10 }} title="Regístrate">
                        <Form
                            ref="form"
                            type={this.user}
                            options={this.options}
                            onChange={v => this.onChange(v)}
                            value={this.state.user}
                        />
                        <AppButton
                            bgColor="rgba(111, 38, 74, 0.7)"
                            title="Registrarme"
                            action={this.register.bind(this)}
                            iconName="vpn-lock"
                            iconSize={30}
                            iconColor="#fff"
                        />
                    </Card>
                </View>
            </BackgroundImage>
        );
    }
}

export default Register;