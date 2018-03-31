import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import stocks from "../data/stocks.json";
import "../App.css";

class StockBrowser extends Component {

 constructor(props) {
    super(props);
    this.state = {
        currentStockSymbol: "",
        stockInfo: []    
    };
    this.handleSelect = this.handleSelect.bind(this);
 }
 
 handleSelect(key) {
    this.setState({ currentStockSymbol: key});
 }

 render() {
     
        stocks.sort(function(a,b) {
            if(a.symbol < b.symbol) return -1;
            if(a.symbol > b.symbol) return 1;
            return 0;        
        });
      
        console.log(stocks);
        return (
            
            <div>
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">Stocks</a></li>
                  </ul>
                </nav>  
                
                <h3 className="title is-3">Stocks</h3>
                
                <table className="table is-bordered is-striped is-hoverable">
                    <tbody>
                        {stocks.map((obj) =>
                            <tr>
                                <td><img className="stockImages" src={"/logos/"+ obj.symbol + ".svg"} alt="" /></td>
                                <td><NavLink to={"/stocks/" + obj.symbol}>{obj.name}</NavLink></td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
        );
   
}
}

export default StockBrowser;