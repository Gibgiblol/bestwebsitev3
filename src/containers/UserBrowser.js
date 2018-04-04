import React, { Component } from 'react';
import UserListItem from '../containers/UserListItem.js';
import axios from 'axios';
import { NavLink } from "react-router-dom";

class UserBrowser extends Component {

 constructor(props) {
    super(props);
    this.state = {
        currentUserID: 1,
        users: []
    };
    this.handleSelect = this.handleSelect.bind(this);
 }
 
 
 /*copied over from react lab for axios*/
 componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => { 
            this.setState({users: response.data});
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
 }
 
 handleSelect(key) {
    this.setState({ currentUserID: key});
 }

 render() {
    if (! this.state.users || this.state.users.length === 0) {
        return null;
    } else {
        
        this.state.users.sort(function(a, b) {return a.name > b.name});
        
        return (
            
            <div>
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">Portfolio</a></li>
                  </ul>
                </nav>  
                
                <h3 className="title is-3">Users</h3>
                
                <article className="section columns">
                    <section className="column">
                        <nav className="panel">
                            <h3 className="panel-heading">Users</h3>
                            {
                                // loop through the users retrieved from our API and
                                // generate a UserListItem component for each user
                                this.state.users.map( (user,ind) => {
                                    let activeClass = "";
                                    return (
                                        <UserListItem key={user.id} index={ind}
                                            identifier={user.id}
                                            active={activeClass}
                                            select={this.handleSelect}
                                        >{user.name}</UserListItem>)
                            })
                        }
                        </nav>
                    </section>
                </article>
            </div>
        );
    }
}
}

export default UserBrowser;