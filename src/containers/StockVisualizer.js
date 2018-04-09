import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import {LineChart} from 'react-easy-chart';
import Dimensions from 'react-dimensions';
import ToolTip from '../ToolTip';

class StockList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            symbol: [],
            selected: "01",
            selectedC1: "",
            comaniesData: [],
            selectedCompany1: [],
            selectedCompany2: [],
            selectedCompany3: [],
            currentMonth: []
        }
        
        this.data = [];
        this.changeMonth = this.changeMonth.bind(this);
        this.changeCompany1 = this.changeCompany1.bind(this);
        this.changeCompany2 = this.changeCompany2.bind(this);
        this.changeCompany3 = this.changeCompany3.bind(this);
        
        this.updateCompany1 = this.updateCompany1.bind(this);
        this.updateCompany2 = this.updateCompany2.bind(this);
        this.updateCompany3 = this.updateCompany3.bind(this);
        
        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    }
    
    componentDidMount() {
      
        
        axios.get('https://bestdatabasev2.herokuapp.com/api/company').then(response => {      
            this.setState({comaniesData: response.data});
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
    }
    
    //When user selects different month, update all chart values to match month with current selected companies
    changeMonth(event){
         this.setState({selected: event.target.value});
         
        if (this.data[0] != null) {
            this.updateCompany1(event.target.value);
        }
        if (this.data[0] != null && this.data[1] != null) {
            this.updateCompany1(event.target.value);
            this.updateCompany2(event.target.value);
        }
        if (this.data[0] != null && this.data[1] != null && this.data[2] != null) {
            this.updateCompany1(event.target.value);
            this.updateCompany2(event.target.value);
            this.updateCompany3(event.target.value);
        }
        
        
        
     }
    
    //On first dropdown list change, requery for new company and update line chart
    changeCompany1(event) {
            this.setState({selectedC1: event.target.value});
            
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/visual/'+event.target.value+'/'+this.state.selected).then(response => { 
            response.data.sort(function(a,b) {
            if(a.x < b.x) return -1;
            if(a.x > b.x) return 1;
            return 0;        
        })
            
            this.data[0] = response.data;
            this.forceUpdate();
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
        
        
    }
    
    //On first dropdown list change, requery for new month and update line chart
    updateCompany1(newMonth) {

            let getSymbol = this.state.selectedC1;
        
      
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/visual/'+getSymbol+'/'+newMonth).then(response => { 
            response.data.sort(function(a,b) {
            if(a.x < b.x) return -1;
            if(a.x > b.x) return 1;
            return 0;        
        })
            
            this.data[0] = response.data;
            this.forceUpdate();
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
        
        
    }
    
    //On second dropdown list change, requery for new company and update line chart
    changeCompany2(event) {
            this.setState({selectedC2: event.target.value});
        
        
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/visual/'+event.target.value+'/'+this.state.selected).then(response => { 
            response.data.sort(function(a,b) {
            if(a.x < b.x) return -1;
            if(a.x > b.x) return 1;
            return 0;        
        })
            
            this.data[1] = response.data;
            this.forceUpdate();
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
    }
    
    //On second dropdown list change, requery for new month and update line chart
    updateCompany2(newMonth) {

            let getSymbol = this.state.selectedC2;
        
      
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/visual/'+getSymbol+'/'+newMonth).then(response => { 
            response.data.sort(function(a,b) {
            if(a.x < b.x) return -1;
            if(a.x > b.x) return 1;
            return 0;        
        })
            
            this.data[1] = response.data;
            this.forceUpdate();
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
    }
      
    
    changeCompany3(event) {
            this.setState({selectedC3: event.target.value});
        
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/visual/'+event.target.value+'/'+this.state.selected).then(response => { 
            response.data.sort(function(a,b) {
            if(a.x < b.x) return -1;
            if(a.x > b.x) return 1;
            return 0;        
        })
            
            this.data[2] = response.data;
            this.forceUpdate();
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
    }
        
            //On third dropdown list change, requery for new month and update line chart
    updateCompany3(newMonth) {

            let getSymbol = this.state.selectedC3;
        
      
        axios.get('https://bestdatabasev2.herokuapp.com/api/price/visual/'+getSymbol+'/'+newMonth).then(response => { 
            response.data.sort(function(a,b) {
            if(a.x < b.x) return -1;
            if(a.x > b.x) return 1;
            return 0;        
        })
            
            this.data[2] = response.data;
            this.forceUpdate();
        })
        .catch(function (error) {
            alert('Error with api call ... error=' + error);
        });
        
        
    }
    
      mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: '{e.y}',
      left: `{e.x + 10}px`,
      y: d.y,
      x: d.x});
          console.log(this.state.top);
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top="500"
          left="600"
        >
            The date is {this.state.x} and the closing value is ${this.state.y}
        </ToolTip>
      );
    }
    return false;
  }
    
    render() {
     
         
        return ( 
            <div>
            
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li className="is-active"><a href="" aria-current="page">Stock Visualizer</a></li>
                  </ul>
                </nav>
            
            
            <div className="field has-addons">
         <div className="control is-expanded">
            <div className="select is-fullwidth is-primary" id="selectMonth" placeholder="Month" onChange={this.changeMonth} value={this.state.value}>
                  <select>
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
            
            
            <div className="control is-expanded">
            <div className="select is-fullwidth is-info" id="selectCompany1" placeholder="Company" onChange={this.changeCompany1} value={this.state.value}>
                  <select>
                    <option>Select Company</option>
                    {this.state.comaniesData.map((obj) =>
                    <option value={obj.symbol}>{obj.name}</option>
                    )}
                  </select>
                </div>
            </div>
            
                  {this.data[0] != null && 
            <div className="control is-expanded">
            <div className="select is-fullwidth is-success" id="selectCompany2" placeholder="Company" onChange={this.changeCompany2} value={this.state.value}>
                  <select>
                    <option>Select Company</option>
            {this.state.comaniesData.map((obj) =>
                    <option value={obj.symbol}>{obj.name}</option>
                    )}
                  </select>
                </div>
            </div>
                  }
                
                {this.data[1] != null && 
            <div className="control is-expanded">
            <div className="select is-fullwidth is-danger" id="selectCompany3" placeholder="Company" onChange={this.changeCompany3} value={this.state.value}>
                  <select>
                    <option>Select Company</option>
                    {this.state.comaniesData.map((obj) =>
                    <option value={obj.symbol}>{obj.name}</option>
                    )}
                  </select>
                </div>
            </div>
                }
        </div>
        <div>
            {this.createTooltip()}     
            <LineChart
                axes
                dataPoints
                mouseOverHandler={this.mouseOverHandler}
                mouseOutHandler={this.mouseOutHandler}
                mouseMoveHandler={this.mouseMoveHandler}
                xType={'text'}
                lineColors={['blue', 'green', 'red']}
                margin={{top: 10, right: 10, bottom: 50, left: 50}}
                axisLabels={{x: 'Dates', y: 'Money'}}
                width={this.props.containerWidth * 0.9}
                height={this.props.containerWidth * 0.9/2}
                
            data={ this.data }
                
                
              />
              
            </div>
            
        </div>
            

            
        );

        
    }
}

export default Dimensions()(StockList);