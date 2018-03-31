import React, { Component } from 'react';
import stocks from "../data/stocks.json";
import userStockPortfolio from "../data/userStockPortfolio.json";
import { NavLink } from "react-router-dom";

class UserPortfolio extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            sortSymbol: "asc",
            sortName: "asc",
            sortAmount: "asc"
        }
        this.sortSymbol = this.sortSymbol.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortAmount = this.sortAmount.bind(this);
    }
    
    componentDidMount() {
        
        const filteredStockPortfolio = userStockPortfolio.filter(id => id.userId === Number(this.props.userid));
        
        let userPortfolio = [];
        
        filteredStockPortfolio.forEach(function(filteredStockPortfolio) {
            stocks.forEach(function(stocks) {
                if(stocks.symbol === filteredStockPortfolio.symbol) {
                    userPortfolio.push({ symbol: stocks.symbol,
                        name: stocks.name,
                        amount: filteredStockPortfolio.amount
                    });
                }
            });
        }); 
        
        this.setState({ userArray: userPortfolio});
        
    }
    
    sortSymbol() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortSymbol === "asc") {
            this.state.userArray.sort(function(a,b) {
                if(a.symbol < b.symbol) return -1;
                if(a.symbol > b.symbol) return 1;
                return 0;
            });
            this.setState({
                userArray: this.state.userArray,
                sortSymbol: "desc"
            });
        } else {
            this.state.userArray.sort(function(a,b) {
                if(a.symbol > b.symbol) return -1;
                if(a.symbol < b.symbol) return 1;
                return 0;                
            });
            this.setState({
                userArray: this.state.userArray,
                sortSymbol: "asc"
            });
        }
        
    }
    
    sortName() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortName === "asc") {
            this.state.userArray.sort(function(a,b) {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            this.setState({
                userArray: this.state.userArray,
                sortName: "desc"
            });
        } else {
            this.state.userArray.sort(function(a,b) {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;                
            });
            this.setState({
                userArray: this.state.userArray,
                sortName: "asc"
            });
        }
        
    }

    sortAmount() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortAmount === "asc") {
            this.state.userArray.sort(function(a,b) {return a.amount - b.amount});
            this.setState({
                userArray: this.state.userArray,
                sortAmount: "desc"
            });
        } else {
            this.state.userArray.sort(function(a,b) {return b.amount - a.amount});
            this.setState({
                userArray: this.state.userArray,
                sortAmount: "asc"
            });
        }
        
    }
    render() {
    
    if (! this.state.userArray || this.state.userArray.length === 0) {
        return null;
    } else {    
    
        return ( 
            
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th onClick={this.sortSymbol}> Symbol </th>
                        <th onClick={this.sortName}> Name </th>
                        <th onClick={this.sortAmount}> Amount </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.userArray.map((obj) =>
                        <tr>
                            <td><NavLink to={"/stocks/" + obj.symbol}>{obj.symbol}</NavLink></td>
                            <td><NavLink to={"/stocks/" + obj.symbol}>{obj.name}</NavLink></td>
                            <td> {obj.amount} </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        );
    
        }
    }
}

export default UserPortfolio;