import React, { Component } from 'react';
import Haeder from './header/Header';
import {HashRouter as Router} from 'react-router-dom'
import Main from './main/Main';
import moment from "moment"
import 'moment/locale/zh-cn'

class App extends Component {
  state = {  }
  render() { 
    moment.locale("zh-cn")
    return ( <div style={{backgroundColor:"#ccc"}} className="App">
    <Router>
    <Haeder/>
    <Main/>
    </Router>
  </div> );
  }
}
 
export default App;