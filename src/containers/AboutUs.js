import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class AboutUs extends Component {
    
constructor(props) {
        super(props);
        this.state = { 
            userInfo: this.props.myProp
        }
    }
    
 render() {
    
        console.log(this.state.userInfo);
     
        
        return (
            <div>
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">About</a></li>
                  </ul>
                </nav>  
                
                <h3 className="title is-3">About Us</h3>
                
                <div className="card">
                    <div className="card-content">
                        <article className="message">
                            <div className="message-body">
                                <strong>Author: </strong> Matthew Hale <br/>
                                <strong>Overview: </strong> This project was completed as part of Mount Royal University's Web III development class taught by Randy Connolly. The intent of the 
                                exercise was to have a comprehensive introduction to React development methodologies.<br/>
                                <strong>External Tools: </strong> The following websites, guides, and tools were used to complete this project: <br/>
                                <ul>
                                    <li><a href="https://reactjs.org/">ReactJS</a></li>
                                    <li><a href="https://www.stackoverflow.com">Stackoverflow</a></li>
                                    <li><a href="https://bulma.io">Bulma Framework</a></li>
                                    <li><a href="https://www.w3schools.com/">W3 Schools - CSS/HTML</a></li>
                                    <li><a href="https://github.com/rconnolly/">Github - Randy Connolly</a></li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>                
                
            </div>
        );
    
    
    }
}

export default AboutUs;