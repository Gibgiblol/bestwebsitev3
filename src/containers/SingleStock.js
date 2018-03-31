import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import stocks from "../data/stocks.json";

class SingleStock extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        singleStockArray: []
    }
 }
 
 componentDidMount() {
    let stockCompare = this.props.match.params.symbol;
    let singleStock = [];
        stocks.forEach(function(stocks) {
            if(stocks.symbol === stockCompare) {
                singleStock = stocks;
            }
        })
    console.log(singleStock);
    this.setState({ singleStockArray: singleStock })
     
 }
 
 render() {
        
    if (! this.state.singleStockArray || this.state.singleStockArray.length === 0) {
        return null;
    } else {   
        
        
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
                        <p className="card-header-title">{this.state.singleStockArray.name}</p>
                    </header>
                    <div className="card-content">
                        <article className="message">
                            <div className="message-body">
                                <img src={"/logos/" + this.state.singleStockArray.symbol + ".svg"} alt=""></img><br/>
                                <strong>Symbol: </strong> {this.state.singleStockArray.symbol} <br/>
                                <strong>Sector: </strong> {this.state.singleStockArray.sector} <br/>
                                <strong>Sub-Industry: </strong> {this.state.singleStockArray.subIndustry} <br/>
                                <strong>Address: </strong> {this.state.singleStockArray.address} <br/>
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
