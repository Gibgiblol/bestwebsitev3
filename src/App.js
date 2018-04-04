import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HeaderApp from './components/HeaderApp.js';
import UserBrowser from './containers/UserBrowser.js';
import StockBrowser from './containers/StockBrowser.js';
import SingleUser from './containers/SingleUser.js';
import Home from './containers/Home.js';
import SingleStock from "./containers/SingleStock.js";
import AboutUs from "./containers/AboutUs.js";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderApp />
        <main >
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/portfolio" exact component={UserBrowser} />
          <Route path="/companies" exact component={StockBrowser} />
          <Route path="/portfolio/:id" exact component={SingleUser} />
          <Route path="/companies/:symbol" exact component={SingleStock} />
          <Route path="/about" exact component={AboutUs} />
        </main>
      </div>
    );
  }
}

export default App;
