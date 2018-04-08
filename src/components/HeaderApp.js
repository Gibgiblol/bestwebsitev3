import React from 'react';
import HeaderBar from './HeaderBar.js';

const HeaderApp = function (props) {

    return (
        
        <header>
        <HeaderBar userInfo = {props.userInfo}/>
        </header>   
    );
    
   
}

export default HeaderApp;