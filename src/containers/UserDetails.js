import React, { Component } from 'react';

class UserDetails extends Component {
    
 constructor(props) {
    super(props);
    this.state = {
        users: this.props.users,
        addressHidden: false,
        addressToggled: true,
        addressIcon: "fas fa-plus",
        companyHidden: false,
        companyIcon: "fas fa-plus"
    };
    this.toggleAddress = this.toggleAddress.bind(this);
    this.toggleCompany = this.toggleCompany.bind(this);
 }
 /*tried both this way and toggleCompany to try and get get the plus/minus sign to update when clicked*/
  toggleAddress() {
     this.setState({ 
         addressHidden: !this.state.addressHidden,
         addressToggled: !this.state.addressToggled
     });
 }
 
 toggleCompany() {
     this.setState({ companyHidden: !this.state.companyHidden });
     if(this.state.companyHidden) {
         this.setState({ companyIcon: "fas fa-minus"});
     } else {
         this.setState({ companyIcon: "fas fa-plus"});
     }     

 }
 

 
 render() {
        /*after testing a bunch, i was able to confirm that the states update to the appropriate icon name fas-minus/plus, yet the component refused to update to the appropriate icon*/
        let addressIcon;
        if(this.state.addressToggled) {
            addressIcon =  <button className="fas fa-plus" />;
        } else {
            addressIcon =  <button className="fas fa-minus" />
        }
        /*left this in for proof that state is updating as expected but the icon does not change*/
        console.log(this.state.addressToggled);
        console.log(addressIcon);
        
        return (
            
                <div className="card">
                    <div className="card-content">
                        <article className="message">
                            <div className="message-body">
                                <strong>UserID: </strong> {this.state.users.id} <br/>
                                <strong>UserName: </strong> {this.state.users.username} <br/>
                                <strong>Email: </strong> {this.state.users.email} <br/>
                                <strong>Phone: </strong> {this.state.users.phone} <br/>
                                <strong>Website: </strong> {this.state.users.website} <br/>
                            </div>
                        </article>
                        <article className="message">
                            <div className="message-header" onClick={this.toggleAddress}>
                                <p> Address </p>
                                {addressIcon}

                            </div>
                            {!this.state.addressHidden && (
                            <div className="message-body">
                                <strong>Street: </strong> {this.state.users.address.street} <br/>
                                <strong>Suite: </strong> {this.state.users.address.suite} <br/>
                                <strong>City: </strong> {this.state.users.address.city} <br/>
                                <strong>Zipcode: </strong> {this.state.users.address.zipcode} <br/>
                            </div>
                            )}
                        </article>
                        <article className="message">
                            <div className="message-header" onClick={this.toggleCompany}>
                                <p> Company </p>
                                <button className={this.state.companyIcon} />
                            </div>
                            
                            {!this.state.companyHidden && (
                            <div className="message-body">
                                <strong>Name: </strong> {this.state.users.company.name} <br/>
                                <strong>Catch Phrase: </strong> {this.state.users.company.catchPhrase} <br/>
                                <strong>Business: </strong> {this.state.users.company.bs} <br/>
                            </div>
                            )}
                        </article>
                    </div>
                </div>
        );
    
    
 }
}

export default UserDetails;