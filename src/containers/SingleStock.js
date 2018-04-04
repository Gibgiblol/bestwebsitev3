import React, { Component } from 'react';
import axios from 'axios';
import StockSummary from "./StockSummary.js";
import StockList from "./StockList.js";
import { NavLink } from "react-router-dom";

class SingleStock extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        company: [],
        companyMonthly: [],
        companySymbol: "",
        summaryActive: true,
        summaryClass: "is-active",
        listActive: false,
        listClass: ""
    }
    this.summaryActive = this.summaryActive.bind(this);
    this.listActive = this.listActive.bind(this);
 }

 componentDidMount() {
   var stockCompare = this.props.match.params.symbol;
    this.setState({companySymbol: stockCompare});
        axios.get('https://bestdatabasev2.herokuapp.com/api/company/'+stockCompare).then(response => { 
            this.setState({company: response.data});
            console.log(this.state.company);
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
     
          axios.get('https://bestdatabasev2.herokuapp.com/api/price/'+stockCompare).then(response => { 
            this.setState({companyMonthly: response.data});
            console.log(this.state.companyMonthly);
            
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
 }
 
 summaryActive() {
     
     if(this.state.summaryActive === false) {
         
         this.setState({ 
             summaryActive: true,
             summaryClass: "is-active",
             listActive: false,
             listClass: ""
         })
     }
 }
 
 listActive() {
     
     if(this.state.listActive === false) {
         
         this.setState({
             summaryActive: false,
             summaryClass: "",
             listActive: true,
             listClass: "is-active"
         })
     } 
 }

 render() {
    
    if (!this.state.companyMonthly || this.state.companyMonthly.length === 0) {
        return null;
    } else { 
        
        return (
            /*breadcrumb layout taken from bulma framework website*/
            <div>
                <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/companies">Companies</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">Company</a></li>
                  </ul>
                </nav>
                
                <h3 className="title is-3">{this.state.company.name}</h3>
            
                <div className="tabs is-toggle is-fullwidth">
                  <ul>
                    <li className={this.state.summaryClass} onClick={this.summaryActive}>
                      <a>
                        <span>Summary</span>
                      </a>
                    </li>
                    <li className={this.state.listClass} onClick={this.listActive}>
                      <a>
                        <span>List</span>
                      </a>
                    </li>
                  </ul>
                </div>
                
                { this.state.summaryActive && (
                    <StockSummary company={this.state.company} companyMonthly={this.state.companyMonthly} />
                )}
                { this.state.listActive && (
                    <StockList companySymbol={this.state.companySymbol} />
                )}
                
            </div>    
            
            
        );
    }
 }
}

export default SingleStock;
