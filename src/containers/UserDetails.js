import React, { Component } from 'react';
import axios from 'axios';
import {PieChart} from 'react-easy-chart';
import Dimensions from 'react-dimensions';

class UserDetails extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        users: this.props.users,
        usersSummary: this.props.usersSummary,
        totalStocks: 0,
        totalWorth: 0,
        
    };
    
 }
    
componentDidMount() {
    
       //Use a loop to loop through the user portfolios to find total companies, stocks and current worth.    
    var tempPrice = 0;
    var tempStock = 0;
    
     for (let x = 0; x < this.state.users.length; x++) {
         tempStock += this.state.users[x].owned;  
           
         axios.get('https://bestdatabasev2.herokuapp.com/api/latestprice/' + this.state.users[x].symbol).then(response => {
        
                 tempPrice += (response.data[0].close * this.state.users[x].owned);
                 this.setState({totalWorth: tempPrice});      
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
     };
    
     
    this.setState({totalStocks: tempStock}); 
    
}
    

 
 render() {
     if (!this.state.usersSummary || this.state.usersSummary.length === 0) {
        return null;
    } else {         
         
     
        
        return (
            
                <div className="card">
                    <div className="card-content">
                        <article className="message">
                            <div className="message-body">
                                <strong>Total Number of Companies: </strong> {this.state.users.length} <br/>
                                <strong>Total Number of Stocks: </strong> {this.state.totalStocks} <br/>
                                <strong>Current Worth: </strong> ${this.state.totalWorth.toFixed(2)} <br/>
                            </div>
                        </article>
                    </div>
                    <PieChart
                        labels
                        
                        width={this.props.containerWidth * 0.8}
                        height={this.props.containerWidth * 0.8/2}
                        data={this.state.usersSummary}
                       clickHandler={
          (d) => this.setState({
            dataDisplay: `The value of ${d.data.key} is ${d.value}%`
          })
        }
                        
                      />
        {this.state.dataDisplay ? this.state.dataDisplay : 'Click on a segment to show the value'}
                </div>
        );
    }
    
    }
 }


export default Dimensions()(UserDetails);