import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserListItem extends Component {

 handlerSelectUser = (key) => {
    this.props.select(key);
 } 
 
 render() {
    let classes = "panel-block ";
    classes += this.props.active;

    return (
        <Link className={classes}
            to={"/user/" + this.props.identifier}
            key={this.props.identifier}
            identifier={this.props.identifier}
            onClick={() => this.props.select(this.props.identifier)} >
            {this.props.children}
        </Link> 
    );
 }
}

export default UserListItem;
