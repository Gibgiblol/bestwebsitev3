import React, { Component } from 'react';
import axios from 'axios';

class StockList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            symbol: this.props.companySymbol,
            selected: "select",
            currentMonth: []
        }
        
        this.changeMonth = this.changeMonth.bind(this);
    }
    
    componentDidMount() {
        
    }
    changeMonth(event){
         this.setState({selected: event.target.value});
        
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/month/'+this.state.symbol+'/'+event.target.value).then(response => { 
            response.data.sort(function(a,b) {
            if(a.date < b.date) return -1;
            if(a.date > b.date) return 1;
            return 0;        
        })
            
            this.setState({currentMonth: response.data});
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
        
     }
    render() {
         ;
        
        return ( 
            <div>
            <div className="field has-addons">
         <div className="control is-expanded">
            <div className="select is-fullwidth" id="selectMonth" placeholder="Month" onChange={this.changeMonth} value={this.state.value}>
                  <select>
                    <option>Select Month</option>
                    <option value="01">Janurary</option>
                    <option value="02">Feburary</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
            </div>
            
        </div>
        <div>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th> Date </th>
                        <th> Open </th>
                        <th> High </th>
                        <th> Low </th>
                        <th> Close </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.currentMonth.map((obj) =>
                        <tr>
                            <td>{obj.date}</td>
                            <td>${obj.open}</td>
                            <td>${obj.high}</td>
                            <td>${obj.low}</td>
                            <td>${obj.close}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
            

            
        );
    
        
    }
}

export default StockList;