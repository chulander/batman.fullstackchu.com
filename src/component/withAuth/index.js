import React, { Component } from 'react';
import querystring from 'query-string';
import AuthService from '../AuthService';

const authRedirect = 'https://login.fullstackchu.com';
export default function withAuth(AuthComponent) {
  const Auth = new AuthService(authRedirect);
  return class AuthWrapped extends Component {
    state = {
      user: null
    };
    componentWillMount() {
      const { location: { pathname = '', search = '' } = {} } = this.props;
      console.log('what is pathname', pathname);
      console.log('what is search', search);

      // const [, params = ''] = search.split('?');

      // console.log()
      const { id_token } = querystring.parse(search);
      console.log('what is parsed.id_token', id_token);
      if (!Auth.loggedIn() && !id_token) {
        console.log('testing auth error mount');
        window.location.replace(authRedirect);
      } else {
        try {
          console.log('testing auth success mount');
          const token = Auth.getToken();
          console.log('what is getToken token', token);
          if (!token && id_token) {
            Auth.setToken(id_token);
          }
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          console.log('error  getting auth profile', err);
          window.location.replace(authRedirect);
        }
      }
    }
    render() {
      return !this.state.user ? null : (
        <AuthComponent history={this.props.history} user={this.state.user} />
      );
      // return !this.state.user ? null : (
      //   <AuthComponent history={this.props.history} user={this.state.user} />
      // );
    }
  };
}
