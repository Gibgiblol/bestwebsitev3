import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

class LoginPage extends Component {

       state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

//Login page template created from https://github.com/dansup/bulma-templates/blob/master/templates/login.html
 render() {


 const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
        return (
<section className="hero is-dark is-fullheight">
    <div className="hero-body">
      <div className="container is-light has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">BitStocker Login</h3>
          <p className="subtitle has-text-grey">Please enter login information</p>
          <div className="box">
            <form>
              <div className="field">
                <div className="control">
                  <input className="input is-large" type="email" placeholder="Your Email" autoFocus="" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input is-large" type="password" placeholder="Your Password" />
                </div>
              </div>
              <button className="button is-block is-info is-large is-fullwidth">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
            
            <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
  </section>
         
        );
    
    
    }
}

export default LoginPage;