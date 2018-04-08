import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {

 constructor(props) {
    super(props);
    this.state = {
        home: []
    };
 }

 render() {
    return (
        <article className="section columns">
             <div className="card column ">
              <div className="card-image">
                <figure className="image is-4by3">
                
                  <img src="https://placeimg.com/640/480/people/grayscale" alt=""/>
                </figure>
              </div>
              <div className="card-content">
                <div className="content has-text-centered">
                  Browse your portfolio in the system<br/>
                  <NavLink className="button is-primary is-flex "to={ {pathname:"/portfolio/"} }>View Portfolio</NavLink>
                </div>
              </div>
            </div>
            
            <div className="card column ">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://placeimg.com/640/480/arch/grayscale" alt=""/>
                </figure>
              </div>
              <div className="card-content">
                <div className="content has-text-centered">
                  View current companies<br/>
                  <NavLink className="button is-primary is-flex "to={ {pathname:"/companies"} }>View Companies</NavLink>
                </div>
              </div>
            </div>
            
            <div className="card column ">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://placeimg.com/640/480/tech/grayscale" alt=""/>
                </figure>
              </div>
              <div className="card-content">
                <div className="content has-text-centered">
                  View information about System<br/>
                  <NavLink className="button is-primary is-flex "to={ {pathname:"/about"} }>About Us</NavLink>
                </div>
              </div>
            </div>
        </article>
        
    );
 }
}

export default Home;