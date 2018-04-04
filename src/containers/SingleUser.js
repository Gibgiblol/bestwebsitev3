import React, { Component } from 'react';
import axios from 'axios';
import UserDetails from "./UserDetails.js";
import UserPortfolio from "./UserPortfolio.js";
import { NavLink } from "react-router-dom";

class SingleUser extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        users: [],
        usersSummary: [],
        detailsActive: true,
        detailsClass: "is-active",
        portfolioActive: false,
        portfolioClass: ""
    }
    this.detailsActive = this.detailsActive.bind(this);
    this.portfolioActive = this.portfolioActive.bind(this);
 }
 
 componentDidMount() {
    // Here we are using the Axios to retrieve all the user info needed for summary
    axios.get('https://bestdatabasev2.herokuapp.com/api/portfolio/' + this.props.match.params.id).then(response => {
            this.setState({users: response.data});
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
     axios.get('http://bestdatabasev2.herokuapp.com/api/portfoliosum/' + this.props.match.params.id).then(response => {
            this.setState({usersSummary: response.data});
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
     
 }
 
 detailsActive() {
     
     if(this.state.detailsActive === false) {
         
         this.setState({ 
             detailsActive: true,
             detailsClass: "is-active",
             portfolioActive: false,
             portfolioClass: ""
         })
     }
 }
 
 portfolioActive() {
     
     if(this.state.portfolioActive === false) {
         
         this.setState({
             detailsActive: false,
             detailsClass: "",
             portfolioActive: true,
             portfolioClass: "is-active"
         })
     } 
 }

 render() {
    
    if (!this.state.users || this.state.users.length === 0) {
        return null;
    } else { 
        
        return (
            /*breadcrumb layout taken from bulma framework website*/
            <div>
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">Portfolio</a></li>
                  </ul>
                </nav>
                
                <h3 className="title is-3">{this.state.users.name}</h3>
            
                <div className="tabs is-toggle is-fullwidth">
                  <ul>
                    <li className={this.state.detailsClass} onClick={this.detailsActive}>
                      <a>
                        <span>Summary</span>
                      </a>
                    </li>
                    <li className={this.state.portfolioClass} onClick={this.portfolioActive}>
                      <a>
                        <span>List</span>
                      </a>
                    </li>
                  </ul>
                </div>
                
                { this.state.detailsActive && (
                    <UserDetails users={this.state.users} usersSummary = {this.state.usersSummary}/>
                )}
                { this.state.portfolioActive && (
                    <UserPortfolio userid={this.props.match.params.id} />
                )}
                
            </div>    
            
            
        );
    }
 }
}

export default SingleUser;
