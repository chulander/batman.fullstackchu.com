import React, { Component } from 'react';
import { AuthService, withAuth } from './component';
import logo from './resource/logo.svg';
import './App.css';

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

  // componentWillMount() {
  //   const token = Auth.getToken();
  //   fetch('https://login.fullstackchu.com', {
  //     method: 'get',
  //     headers: new Headers({
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //     .then(res => {
  //       console.log('success getting res', res);
  //     })
  //     .catch(err => {
  //       console.error('error geting ', err);
  //     });
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.props.user && <h2>Welcome {this.props.user.username}</h2>}
          <h2>this is batman's landing page</h2>
          <p className="App-intro">
            <button
              type="button"
              className="form-submit"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </p>
        </header>
      </div>
    );
  }
}

export default withAuth(App);
