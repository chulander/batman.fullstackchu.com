import React, { Component } from 'react';
import { AuthService, Home, withAuth } from './component';

const Auth = new AuthService();

class App extends Component {
  handleLogout = () => {
    Auth.logout();
    const {
      history: {
        replace = function() {
          void 0;
        }
      } = {}
    } = this.props;

    replace('/');
  };

  render() {
    const { props: { user } = {} } = this;
    return (
      <Home
        handleLogout={this.handleLogout}
        user={user ? username : undefined}
      />
    );
  }
}

export default withAuth(App);
