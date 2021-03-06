import React, { Component } from 'react';
import { Route } from 'react-router';
import md5 from 'crypto-md5';
import HeaderApp from './components/HeaderApp.js';
import StockBrowser from './containers/StockBrowser.js';
import SingleUser from './containers/SingleUser.js';
import Home from './containers/Home.js';
import SingleStock from "./containers/SingleStock.js";
import StockVisualizer from "./containers/StockVisualizer.js";
import AboutUs from "./containers/AboutUs.js";
import axios from 'axios';
import { Redirect} from "react-router-dom";

//Redirect tutorial and code grabbed from https://reacttraining.com/react-router/web/example/auth-workflow
//Router OnEnter function has been depreciated since V3 and installing it via npm installed the latest V4 version
//Redirect was the new way to do front end authentication, so code and tutorial was copied from the tutorial site

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

const userInfo = {
    userArray: [],
    saveInfo (data) {
        this.userArray = data;
    }       
};

//Prebuilt route that we use for redirects and passing our user data so other components can use it
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component userInfo={userInfo.userArray} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

//Recreats app once login is fulfilled
class App extends Component {

  render() {
        
    return (
      <div>
        <HeaderApp userInfo = {userInfo.userArray}/>
        <main >
          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/home" exact component={Home}/>
          <PrivateRoute path="/companies" exact component={StockBrowser} />
          <PrivateRoute path="/portfolio/" exact component={SingleUser} />
          <PrivateRoute path="/companies/:symbol" exact component={SingleStock} />
          <PrivateRoute path="/stockvisualizer" exact component={StockVisualizer} />
          <Route path="/login" exact component={LoginPage} />
          <PrivateRoute path="/about" exact component={AboutUs} />
        </main>
      </div>
    );
  }
}

//Login Class to redirect components to
class LoginPage extends Component {
 constructor() {
     super();
    this.state = {
        redirectToReferrer: false,
        emailInput: '',
        passwordInput: ''
      };
        
     this.email = "";
         this.handleLogin = this.handleLogin.bind(this);       
         this.handleChangeEmail = this.handleChangeEmail.bind(this);
         this.handleChangePassword = this.handleChangePassword.bind(this);

     }

   
  
//Handles login request by querying user email, and authenticating through md5 hashing
  handleLogin(event) {
      
    let saltedPass;
    event.preventDefault();
 
    axios.get('https://bestdatabasev2.herokuapp.com/api/users/'+this.state.emailInput).then(response => { 
                  
            saltedPass = this.state.passwordInput.concat(response.data[0].salt);
            saltedPass = md5(saltedPass, 'hex');
        if (saltedPass === response.data[0].password) {
            fakeAuth.authenticate(() => {
                    this.setState({ redirectToReferrer: true });      
                });
            userInfo.saveInfo(response.data);
        }
        else {
            alert("Password Incorrect");
        }       
        })
        .catch(function (error) {
            alert('Invalid email address');
        });     
  }

    //Handles email input
    handleChangeEmail(event) {    
        this.setState({emailInput: event.target.value});
        
      }
    
    //Handles password input
    handleChangePassword(event) {    
        this.setState({passwordInput: event.target.value});
        
      }

//Login page template created from https://github.com/dansup/bulma-templates/blob/master/templates/login.html
 render() {


     
 const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to= {from} />;
    }
     
        return (
<section className="hero is-dark is-fullheight">
    <div className="hero-body">
      <div className="container is-light has-text-centered">
        <div className="column is-4 is-offset-4">
          <h1 className="testTitle">BitStocker Login</h1>
          <p className="subtitle has-text-grey">Please enter login information</p>
          <div className="box">
            <form onSubmit={this.handleLogin}>
              <div className="field">
                <div className="control">
                  <input className="input is-large" type="email" onChange={this.handleChangeEmail} placeholder="Your Email" autoFocus="" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input is-large" type="password" onChange={this.handleChangePassword} placeholder="Your Password" />
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
        <button>Log in</button>
      </div>
  </section>

        );
    
    
    }
}

export default App;
