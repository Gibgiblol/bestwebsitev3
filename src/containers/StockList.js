import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class StockList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    componentDidMount() {
        
    }
    
    render() {
    
        return ( 
            <div className="field has-addons">
         <div className="control is-expanded">
            <div className="select is-fullwidth" id="selectMonth" placeholder="Month">
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
//            <table className="table is-fullwidth">
//                <thead>
//                    <tr>
//                        <th onClick={this.sortSymbol}> Symbol </th>
//                        <th onClick={this.sortName}> Name </th>
//                        <th onClick={this.sortAmount}> Amount </th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {this.state.userArray.map((obj) =>
//                        <tr>
//                            <td><NavLink to={"/stocks/" + obj.symbol}>{obj.symbol}</NavLink></td>
//                            <td><NavLink to={"/stocks/" + obj.symbol}>{obj.name}</NavLink></td>
//                            <td> {obj.amount} </td>
//                        </tr>
//                    )}
//                </tbody>
//            </table>
            
        );
    
        
    }
}

export default StockList;