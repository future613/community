import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import './header.css'
class Haeder extends Component {
    state = { 
        userInfo:null,
        token:""
     }
     
     componentDidMount(){
       const token =  localStorage.getItem("token")
       if(token){
        axios.post(`https://cnodejs.org/api/v1/accesstoken`,{accesstoken:token}).then(
            res =>{
                delete res.data.success
                   this.setState({
                       userInfo:res.data
                   })
            }
        )
       }
     }

    render() { 
        const{userInfo,token}=this.state
        
        return (  <div>
            <div className="header">
                <div className='header-inner'>
                <div className='header-inner-left'>
               <li className="list2 clearfix"> <NavLink to="/"><h1 ><img className='logo' src="https://www.vue-js.com/public/images/vue.png" alt=""/>Vuejs</h1></NavLink></li>
               <input className="login" value={token} onChange={this.handleChange} type="text"/>
               </div>
               <div className='header-inner-right'>
               <li className="list3 clearfix"> <NavLink to="/"><button className="home" >首页</button></NavLink></li>
               <NavLink to="/topic/create"><button>发布话题</button></NavLink>
               <button onClick={this.login}>登录</button> 
               </div>
               </div>             
                </div>
                {userInfo?<div className="mymessage"><p>个人信息</p><img className="avatar_url" src={userInfo.avatar_url} alt=""/><span>{userInfo.loginname}</span><button onClick={this.logout}>登出</button></div>:""} 
                </div>
         );
    }
  
    
    login = ()=>{
    const{token}=this.state
    axios.post(`https://cnodejs.org/api/v1/accesstoken`,{accesstoken:token}).then(
      res =>{
          delete res.data.success         
             this.setState({
                 userInfo:res.data
             })
             localStorage.setItem("token",token)
             localStorage.setItem("author_id",res.data.id)            
      }
      )
     }


    logout = ()=>{         
        localStorage.removeItem("token")        
       this.setState({
           userInfo:null
       })
    }



    handleChange = (event)=>{
        this.setState({
            token:event.target.value
        })
    }
}
 



export default Haeder;