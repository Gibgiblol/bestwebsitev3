import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

class UserPortfolio extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            usersPortfolio: this.props.usersPortfolio,
            sortSymbol: "asc",
            sortName: "asc",
            sortAmount: "asc",
            sortValue: "asc",
            mounted: false
        }
        
        this.sortSymbol = this.sortSymbol.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortAmount = this.sortAmount.bind(this);
        this.sortValue = this.sortValue.bind(this);
    }
    
    componentDidMount() {
        this.mounted = true;
//        const filteredStockPortfolio = this.state.usersPortfolio;
//        
//        let userPortfolio = [];
//        
//        //Axios call first to get company info (name and symbol)
//        filteredStockPortfolio.forEach(function(filteredStockPortfolio) {
//            axios.get('https://bestdatabasev2.herokuapp.com/api/company/' + filteredStockPortfolio.symbol).then(response => {
//                //Axios call again to get latest price based on symbol
//                axios.get('https://bestdatabasev2.herokuapp.com/api/latestprice/' + filteredStockPortfolio.symbol).then(response2 => {
//                //Push everything into a stock array
//                 userPortfolio.push({ symbol: response.data[0].symbol,
//                                      name: response.data[0].name,
//                                      amount: filteredStockPortfolio.owned,
//                                      value: response2.data[0].close * filteredStockPortfolio.owned
//                    });     
//        })
//        .catch(function (error) {
//            alert('Error1 with api call ... error=' + error);
//        });            
//        })
//        .catch(function (error) {
//            alert('Error2 with api call ... error=' + error);
//            });
//        }); 
        
        
//        this.tempArr = userPortfolio;
//        this.setState({ tempArr: userPortfolio});
        console.log(this.state.usersPortfolio);
        this.setState ({mounted: true});
        
    }
    
    
    sortSymbol() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortSymbol === "asc") {
            this.state.usersPortfolio.sort(function(a,b) {
                if(a.symbol < b.symbol) return -1;
                if(a.symbol > b.symbol) return 1;
                return 0;
            });
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortSymbol: "desc"
            });
        } else {
            this.state.usersPortfolio.sort(function(a,b) {
                if(a.symbol > b.symbol) return -1;
                if(a.symbol < b.symbol) return 1;
                return 0;                
            });
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortSymbol: "asc"
            });
        }
        
    }
    
    sortName() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortName === "asc") {
            this.state.usersPortfolio.sort(function(a,b) {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortName: "desc"
            });
        } else {
            this.state.usersPortfolio.sort(function(a,b) {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;                
            });
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortName: "asc"
            });
        }
        
    }

    sortAmount() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortAmount === "asc") {
            this.state.usersPortfolio.sort(function(a,b) {return a.amount - b.amount});
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortAmount: "desc"
            });
        } else {
            this.state.usersPortfolio.sort(function(a,b) {return b.amount - a.amount});
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortAmount: "asc"
            });
        }
        
    }
    
        sortValue() {
        /*sort alphabetical compare taken from https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript */
        if(this.state.sortValue === "asc") {
            this.state.usersPortfolio.sort(function(a,b) {return a.value - b.value});
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortValue: "desc"
            });
        } else {
            this.state.usersPortfolio.sort(function(a,b) {return b.value - a.value});
            this.setState({
                usersPortfolio: this.usersPortfolio,
                sortValue: "asc"
            });
        }
        
    }
    render() {
    
    if (!this.state.mounted) {
        return null;
    } else {    
        console.log(this.state.usersPortfolio);
        return ( 
            
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th onClick={this.sortSymbol}> Symbol </th>
                        <th onClick={this.sortName}> Name </th>
                        <th onClick={this.sortAmount}> Amount </th>
                        <th onClick={this.sortValue}> Value </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.usersPortfolio.map((obj) =>
                        <tr>
                            <td><NavLink to={"/companies/" + obj.symbol}>{obj.symbol}</NavLink></td>
                            <td><NavLink to={"/companies/" + obj.symbol}>{obj.name}</NavLink></td>
                            <td> {obj.amount} </td>
                            <td> ${obj.value.toFixed(2)} </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        );
    
        }
    }
}

export default UserPortfolio;