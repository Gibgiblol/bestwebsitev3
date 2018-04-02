import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {BarChart} from 'react-easy-chart';

class SingleStock extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        company: [],
        companyMonthly: []
    }
 }
 
 componentDidMount() {
    let stockCompare = this.props.match.params.symbol;

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
 
 render() {
        
    if (! this.state.companyMonthly || this.state.companyMonthly.length === 0) {
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
                    <div style={{display: 'inline-block'}}>
                    <h4>Monthly Closing Values</h4>
                        <BarChart
                            colorBars
                            axes
                            grid
                            width={1000}
                            height={500}
                            xTickNumber={5}
                            yTickNumber={5}
                            
                            data={[
                              {x: 'Jan', y: this.state.companyMonthly[1]},
                              {x: 'Feb', y: this.state.companyMonthly[2]},
                              {x: 'Mar', y: this.state.companyMonthly[3]},
                              {x: 'Apr', y: this.state.companyMonthly[4]},
                              {x: 'May', y: this.state.companyMonthly[5]},
                              {x: 'Jun', y: this.state.companyMonthly[6]},
                              {x: 'Jul', y: this.state.companyMonthly[7]},
                              {x: 'Aug', y: this.state.companyMonthly[8]},
                              {x: 'Sep', y: this.state.companyMonthly[9]},
                              {x: 'Oct', y: this.state.companyMonthly[10]},
                              {x: 'Nov', y: this.state.companyMonthly[11]},
                              {x: 'Dec', y: this.state.companyMonthly[12]}
                            ]}
                          />
                    </div>
            
                    <div className="card-content">
                        <article className="message">
                            <div className="message-body">
                                <img src={"/logos/" + this.state.company[0].symbol + ".svg"} alt=""></img><br/>
                                <strong>Symbol: </strong> {this.state.company[0].symbol} <br/>
                                <strong>Sector: </strong> {this.state.company[0].sector} <br/>
                                <strong>Sub-Industry: </strong> {this.state.company[0].subindustry} <br/>
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
