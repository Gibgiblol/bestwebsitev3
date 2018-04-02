import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

class SingleStock extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        company: []
    }
 }
 
 componentDidMount() {
    let stockCompare = this.props.match.params.symbol;

        axios.get('https://bestdatabasev2.herokuapp.com/api/company/'+stockCompare).then(response => { 
            this.setState({company: response.data});
            
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
    
    
    
 }
 
 render() {
        
    if (! this.state.company || this.state.company.length === 0) {
        return null;
    } else {   
        console.log(this.state.company);
        
        return (
            /*breadcrumb layout taken from bulma framework website*/
            <div>
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/stocks">Stocks</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">Stock</a></li>
                  </ul>
                </nav>
            
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">{this.state.company[0].name}</p>
                    </header>
                    <div className="card-content">
                        <article className="message">
                            <div className="message-body">
                                <img src={"/logos/" + this.state.company[0].symbol + ".svg"} alt=""></img><br/>
                                <strong>Symbol: </strong> {this.state.company[0].symbol} <br/>
                                <strong>Sector: </strong> {this.state.company[0].sector} <br/>
                                <strong>Sub-Industry: </strong> {this.state.company[0].subIndustry} <br/>
                                <strong>Address: </strong> {this.state.company[0].address} <br/>
                            </div>
                        </article>
                        
                    </div>
                </div>  
            </div>
            
            
        );
    }
 }
}

export default SingleStock;
