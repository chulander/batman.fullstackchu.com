import React, { Component } from 'react';
import { AuthService, Home, withAuth } from './component';

const Auth = new AuthService();

class App extends Component {
  handleLogout = () => {
    Auth.logout();
  };

  render() {
    const { props: { user } = {} } = this;
    return (
      <Home
        handleLogout={this.handleLogout}
        username={user ? user.username : undefined}
      />
    );
  }
}

export default withAuth(App);
