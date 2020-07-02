import React, { Component } from 'react';
import './main.css'
import { Route} from 'react-router-dom'
import Post from '../post/Post';
import User from '../user/User';
import Home from '../home/Home';
import {withRouter} from 'react-router-dom'
import Creat from '../creat/Creat';
class Main extends Component {
    state = {  }
    render() {       
        return ( <div>
           <Route exact path='/' component={Home}/> 
           <Route path="/post/:id" component={Post}/>
           <Route path="/user/:id" component={User}/> 
           <Route path="/topic/create" component={Creat}/>           
        </div> );
    }
}
 
export default withRouter(Main);