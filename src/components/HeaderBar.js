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
            _notificationSystem: null,
            checkUser: false
        }
        this.showBurger = this.showBurger.bind(this);
        this._addNotification = this._addNotification.bind(this);
        
       this.socket = io('https://msnremastered.herokuapp.com/');

        this.socket.on('RECEIVE_MESSAGE', function(data){         
                addMessage(data);     
        });
  
          this.socket.on('user joined', function (data) {
                addMessage(data); 
              });
            
        const addMessage = data => {
            
            if (this.state.open === true) {
                this.setState({messages: [...this.state.messages, data]});
            } else {
                
                this.setState({messages: [...this.state.messages, data]});
                this._addNotification(data);
            }
            
            
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
    
    //Notification settings
    _addNotification(msg) {
    this._notificationSystem.addNotification({
      message: msg.author + ": "+msg.message,
      level: 'success',
        autoDismiss: 2,
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
    
//Top header bar buttons on the right is hidden until user logs in
    render() {
        const { open } = this.state;
        
        if(this.props.userInfo[0] != null && this.state.checkUser !== true) {
            this.socket.emit('add user', {author: this.props.userInfo[0].first_name, message: "has joined!"});
            this.setState({checkUser: true});
        }
       
        
        return (
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <span className="icon">
                            <i className="fab fa-lg fa-btc"></i>
                        </span>
                    </a>
                    <span className="navbar-item">
                        <h1 className="title">BitStocker</h1>
                    </span>
                        
                        {
                            this.props.userInfo[0] != null && 
                                
                                <div className="navbar-item">
                                        <h1 className="title is-hidden-mobile">Welcome {this.props.userInfo[0].first_name} {this.props.userInfo[0].last_name}</h1>
                                </div>  
                        }
                    
                    <div className="navbar-burger" ref="burger" onClick={this.showBurger}>
                        <span />     
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                <div className="navbar-end">
                {
                        this.props.userInfo[0] != null &&
                    <div className="navbar-item">
                        
                      <p className="control">
                        <a className="button is-primary" onClick={this.onOpenModal}>
                          <span className="icon">
                            <i className="fas fa-comment-alt"></i>
                          </span>
                            <span>Open Chat</span>
                          
                        </a>
                      </p>
                    </div>
                    }
                    {
                        this.props.userInfo[0] != null && 
                      <div className={this.state.navMenuClass} ref="navMenu">
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
                              <NavLink className="navbar-item dropdown1" to={ {pathname:"/portfolio/", state: {userInfo: this.props.userInfo} } } >
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
                               <hr className="dropdown-divider"/>
                              <NavLink className="navbar-item dropdown3" to={ {pathname:"/stockvisualizer"} }>
                                <strong>Stock Visualizer</strong>
                                <br/>
                                Compare companies to each other monthly
                                <br/>
                              </NavLink>
                              <hr className="dropdown-divider" />
                              <NavLink className="navbar-item dropdown4" to={ {pathname:"/about"} }>
                                <strong>About Us</strong>
                                <br />
                                Find out more about this system
                                <br/>
                              </NavLink>
                            </div>  
                        </div>
                    </div>
            }
             <Modal open={open} onClose={this.onCloseModal} little>
                  <h2><span className="icon">
                            <i className="fab fa-facebook-messenger"></i>
                          </span>MSN Messenger</h2>
                    <div className="chatBox container">
                
                   
                        <div className="card chatHolder">
                            <div className="card-body">
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
                                <form onSubmit={this.sendMessage}>
                                <input type="text" placeholder="Message" className="form-control chatArea" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} />
                                
                                <button className="btn btn-primary form-control">Send</button>
                                </form>
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



