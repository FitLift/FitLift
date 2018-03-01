import React, { PureComponent } from 'react';
import { TouchableHighlight, Text, Button } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createNewUser, loginUser } from '../api/auth';

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-left: 10%;
`;

const SpanView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  border-color: #fb8c00;
  border-radius: 4px;
  border-width: 1px;
  margin-bottom: 20px;
  font-size: 18px;
  height: 40px;
  width: 100%;
  padding: 10px;
`;

const WhiteText = styled.Text`
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const LoginText = styled.Text`
  color: #8585ad;
  font-size: 34px;
  margin-bottom: 20px;
`;

const LoginButton = styled.TouchableHighlight`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #fb8c00;
  border-radius: 4px;
  padding: 5px;
`;

const ErrorText = styled.Text`
  color: #cc2900;
  font-size: 18px;
`;

export const mapStateToProps = state => ({
  login: state.login
});

export default class App extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Log In'
  });

  onChangeText = type => letter => this.props.updateInput(type, letter);

  onPress = () => {
    const { login: { username, password }, loginUser } = this.props;
    loginUser(username, password);
  };

  signUpOnPress = () => this.props.navigation.navigate({ routeName: 'signup' });

  render() {
    const { login: { username, password, error } } = this.props;
    return (
      <StyledView>
        <LoginText>FitLift</LoginText>
        <StyledInput
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
          returnKeyType="next"
          placeholder="username"
          keyboardType="email-address"
          value={`${username}`}
          onChangeText={this.onChangeText('username')}
          onSubmitEditing={() => {
            this.passwordRef.root.focus();
          }}
        />
        <StyledInput
          autoCorrect={false}
          ref={passwordRef => {
            this.passwordRef = passwordRef;
          }}
          returnKeyType="go"
          placeholder="password"
          value={`${password}`}
          onChangeText={this.onChangeText('password')}
          secureTextEntry
          onSubmitEditing={event => {
            this.buttonRef.root.touchableHandlePress();
          }}
        />
        <LoginButton
          ref={buttonRef => {
            this.buttonRef = buttonRef;
          }}
          style={{ width: '100%' }}
          underlayColor="white"
          onPress={this.onPress}
        >
          <WhiteText>Login</WhiteText>
        </LoginButton>
        <ErrorText>{error}</ErrorText>
        <SpanView>
          <Text>Dont have an account?</Text>
          <Button title="Sign up" onPress={this.signUpOnPress} />
        </SpanView>
      </StyledView>
    );
  }
}
