import React from 'react';
import {View, Button, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import firebase from '../Firebase';
import { FormLabel, FormInput } from 'react-native-elements'
import { functions } from 'firebase';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
    }

    onLoginPress() {
        this.setState({
            error: '',
            loading: true
        });

        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({
                error: '',
                loading: false
            })
            this.props.navigation.navigate('Main')
        })

        .catch(() => {
            this.setState({
                error: 'Authentication Failed',
                loading: false
            })
        })
    }

    onSignUpPress() {
        this.setState({
            error: '',
            loading: true
        });

        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((newUser) => {
            functions.auth.user().onCreate((user) => {
                firebase.firestore().collection('Users').doc(newUser.uid).set({
                    email: user.email,
                    posts: []
                })
            })
        })
        .then(() => {
            // firebase.firestore().collection('Users').doc(user.uid).add({
            //     email: user.email,
            //     posts: []
            // })
            // functions.auth.user().onCreate((user) => {
            //     console.log("hi")

            //     const account = {
            //         posts: [],
            //         email: user.email
            //     }
            //     return firebase.firestore().collection("Users").doc(user.uid).set(account)
            // })
            this.setState({
                error: '',
                loading: false
            })
            this.props.navigation.navigate('Main')
        })

        .catch(() => {
            this.setState({
                error: 'User already exists',
                loading: false
            })
        })        
    }

    renderButtonOrLoading() {
        if(this.state.loading) {
            return <Text>Loading</Text>
        }
        return <View>
            <Button onPress={this.onLoginPress.bind(this)} title="Login" />
            <Button onPress={this.onSignUpPress.bind(this)} title="Sign Up" />
        </View>
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.form} behavior="padding">
                <Text style={styles.title}>WanderFood</Text>
                <FormLabel>Email</FormLabel>
                <FormInput 
                    value={this.state.email} 
                    onChangeText={email => this.setState({ email })}
                    placeholder="email@email.com" />
                <FormLabel>Password</FormLabel>
                <FormInput
                    value={this.state.password}
                    secureTextEntry
                    placeholder='******'
                    onChangeText={password => this.setState({ password })} />
                    <Text>{this.state.error}</Text>
                    {this.renderButtonOrLoading()}
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
        fontSize: 30
    }
})