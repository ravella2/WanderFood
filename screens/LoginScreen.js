import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import firebase from '../Firebase';
import { FormLabel, FormInput } from 'react-native-elements'

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

    renderButtonOrLoading() {
        if(this.state.loading) {
            return <Text>Loading</Text>
        }
        return <View>
            <Button onPress={this.onLoginPress.bind(this)} title="Login" />
            <Button color="red" onPress={this.onSignUpPress.bind(this)} title="Sign Up" />
        </View>
    }

    render() {
        return (
            <View style={styles.form}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
    },
})