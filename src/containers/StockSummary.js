import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
import Dimensions from 'react-dimensions';
//Dimensions plugin from https://github.com/digidem/react-dimensions
//Chart plugin from https://rma-consulting.github.io/react-easy-chart/

class StockSummary extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        company: this.props.company,
        companyMonthly: this.props.companyMonthly
    };
 }
 
 render() {
        
    if (! this.state.companyMonthly || this.state.companyMonthly.length === 0) {
        return null;
    } else {   
        console.log(this.state.company);
        
        return (
            /*breadcrumb layout taken from bulma framework website*/
            <div>
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
                                <strong>Sub-Industry: </strong> {this.state.company[0].subindustry} <br/>
                                <strong>Address: </strong> {this.state.company[0].address} <br/>
                            </div>
                        </article>
                        
                    </div>
            
                <div style={{display: 'inline-block'}}>
                    <h4>Monthly Closing Values</h4>
                        <BarChart
                            colorBars
                            axes
                            grid
                            width={this.props.containerWidth * 0.8}
                            height={this.props.containerWidth * 0.8/2}
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
                            mouseOverHandler={this.mouseOverHandler}
                            mouseOutHandler={this.mouseOutHandler}
                            mouseMoveHandler={this.mouseMoveHandler}
                          />
                    </div>
                </div>  
            </div>
            
            
        );
    }
 }
}

export default Dimensions()(StockSummary);