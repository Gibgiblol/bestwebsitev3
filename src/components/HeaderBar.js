import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import io from "socket.io-client";
import Modal from 'react-responsive-modal';
import NotificationSystem from 'react-notification-system';

class HeaderBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            burgerMenuState: false,
            navMenuClass: "navbar-menu",
            userInfo: this.props.userInfo,
            open: false,
            username: '',
            message: '',
            messages: [],
            _notificationSystem: null
        }
        this.showBurger = this.showBurger.bind(this);
        this._addNotification = this._addNotification.bind(this);
        
       this.socket = io('https://msnremastered.herokuapp.com/');

        this.socket.on('RECEIVE_MESSAGE', function(data){
                
                addMessage(data);
            
        });

        const addMessage = data => {
            console.log(data);
            if (this.state.open === true) {
                this.setState({messages: [...this.state.messages, data]});
            } else {
                
                this.setState({messages: [...this.state.messages, data]});
                this._addNotification(data);
            }
            
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.userInfo[0].first_name,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    
     componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    
    _addNotification(msg) {
    this._notificationSystem.addNotification({
      message: msg.author + ": "+msg.message,
      level: 'success',
        autoDismiss: 1,
        position: 'tc'
    });
  }

    //Modal is used for chat functionality, when you click button it will open up the chat modal
    //Modal is grabbed from https://react-responsive-modal.leopradel.com/
    //Chat app is based on tutorial from https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
        const { open } = this.state;
        
        return (
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <span className="icon">
                            <i className="fab fa-lg fa-btc"></i>
                        </span>
                    </a>
                    <a className="navbar-item">
                        <h1 className="title">BitStocker</h1>
                    </a>
                        {
                            this.props.userInfo[0] != null && 
                                <div className="navbar-item is-right">
                                        <h1 className="title">Welcome {this.props.userInfo[0].first_name} {this.props.userInfo[0].last_name}</h1>
                                        <button onClick={this.onOpenModal}>Open modal</button>
           
                                </div>
                                
                          
                        }
                    
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
                              <NavLink className="navbar-item dropdown0" to={ {pathname:"/"} }>
                                <strong>Home</strong>
                                <br/>
                                Return to homepage
                                <br/>
                              </NavLink>
                               <hr className="dropdown-divider" />
                              <NavLink className="navbar-item dropdown1" to={ {pathname:"/portfolio/"} }>
                                <strong>Users</strong>
                                <br/>
                                Browse your portfolio in our system
                                <br/>
                              </NavLink>
                               <hr className="dropdown-divider"/>
                              <NavLink className="navbar-item dropdown2" to={ {pathname:"/companies"} }>
                                <strong>Stocks</strong>
                                <br/>
                                Browse the companies in our system
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
             <Modal open={open} onClose={this.onCloseModal} little>
                  <h2>Simple centered modal</h2>
                    <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </Modal>
            <NotificationSystem ref="notificationSystem" />
                </div>
                
            </nav>
        );
    }
}

export default HeaderBar;



