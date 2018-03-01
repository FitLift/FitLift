import React, { PureComponent } from 'react';
import { TouchableHighlight, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from '../../api/auth';
import { updateInput } from './redux';
import FormView from '../../components/FormView';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser,
      updateInput
    },
    dispatch
  );

export const mapStateToProps = state => ({
  username: state.login.username,
  password: state.login.password,
  error: state.login.error
});

export class App extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Log In'
  });

  render() {
    const { username, password, error } = this.props;
    return (
      <FormView
        {...this.props}
        buttonText="Login"
        bottomText="Don't have an account?"
        bottomButtonText="Sign up"
        buttonOnPress={this.props.loginUser}
        bottomButtonNavigationRouteName="signup"
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
