import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HeaderBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            burgerMenuState: false,
            navMenuClass: "navbar-menu"
        }
        this.showBurger = this.showBurger.bind(this);
    }
    
    showBurger() {
        
        if(this.state.burgerMenuState === true) {
            
            this.setState({
                burgerMenuState : false,
                navMenuClass: "navbar-menu"
            });
        } else {
            
            this.setState({
                burgerMenuState : true,
                navMenuClass: "navbar-menu is-active"
            });
        }
    }
    
    render() {
        return (
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <span className="icon">
                            <i className="fab fa-lg fa-btc"></i>
                        </span>
                    </a>
                    <a className="navbar-item">
                        <h1 className="title">Assign 1</h1>
                    </a>
                    
                    <div className="navbar-burger" ref="burger" onClick={this.showBurger}>
                        <span />     
                        <span />
                        <span />
                    </div>
                </div>
                
                <div className={this.state.navMenuClass} ref="navMenu">
                    <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                               <strong>Users Stock Portfolio Viewer</strong>
                            </a>
                            
                            <div className="navbar-dropdown is-right">
                              <hr className="dropdown-divider" />
                              <NavLink className="navbar-item dropdown0" to={ {pathname:"/users"} }>
                                <strong>Home</strong>
                                <br/>
                                Return to homepage
                                <br/>
                              </NavLink>
                               <hr className="dropdown-divider" />
                              <NavLink className="navbar-item dropdown1" to={ {pathname:"/users"} }>
                                <strong>Users</strong>
                                <br/>
                                Browse the users in our system
                                <br/>
                              </NavLink>
                               <hr className="dropdown-divider"/>
                              <NavLink className="navbar-item dropdown2" to={ {pathname:"/stocks"} }>
                                <strong>Stocks</strong>
                                <br/>
                                Browse the stocks in our system
                                <br/>
                              </NavLink>
                              <hr className="dropdown-divider" />
                              <NavLink className="navbar-item dropdown3" to={ {pathname:"/about"} }>
                                <strong>About Us</strong>
                                <br />
                                Find out more about this system
                                <br/>
                              </NavLink>
                            </div>  
                        </div>
                    </div>
                </div>
                
            </nav>
        );
    }
}

export default HeaderBar;



