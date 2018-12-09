import React, { Component } from 'react';
import AuthService from '../AuthService';

const authRedirect = 'https://login.fullstackchu.com';
export default function withAuth(AuthComponent) {
  const Auth = new AuthService(authRedirect);
  return class AuthWrapped extends Component {
    state = {
      user: null
    };
    componentWillMount() {
      if (!Auth.loggedIn()) {
        console.log('testing auth error mount');
        window.location.replace(authRedirect);
      } else {
        try {
          console.log('testing auth success mount');
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace('/');
        }
      }
    }
    render() {
      return !this.state.user ? null : (
        <AuthComponent history={this.props.history} user={this.state.user} />
      );
    }
  };
}
