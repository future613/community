import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import './user.css'
import {NavLink} from 'react-router-dom'

class User extends Component {
    state = { 
        userlist:null
     }
     componentDidMount() {
        const {id}= this.props.match.params
        axios.get(`https://cnodejs.org/api/v1/user/${id}`).then(
            res=>{
            this.setState({
               userlist:res.data.data  
            })
            console.log(res.data.data)
            }  
        )     
     }
     componentDidUpdate(prevProps){
        const {id}= this.props.match.params
         if(this.props.location.pathname !== prevProps.location.pathname){
            axios.get(`https://cnodejs.org/api/v1/user/${id}`).then(
                res=>{
                this.setState({
                   userlist:res.data.data  
                })
                }  
            )     
         }
     }

    render() { 
        const{userlist}=this.state
        return ( <div> 
            
   {userlist? <div className="userpage" >
       <div className="mainpage">
        <h3>主页</h3><img src={userlist.avatar_url} alt=""/> <span>{userlist.loginname}</span> <br/> <span>{userlist.score} 积分</span> <br/><span>注册时间 {moment(userlist.create_at).fromNow()}</span>
       </div>
       <div className="nowtopic">
        <h3>最近创建的话题</h3>
        {userlist?userlist.recent_topics.map(item=><li key={item.id} className="nowlist"> <NavLink to={`/user/${item.author.loginname}`}><img className="author-pic"  src={item.author.avatar_url} alt=""/> </NavLink> <NavLink to={`/post/${item.id}`}><p  className="title">{item.title}</p></NavLink><span className="usertime">{moment(item.last_reply_at).fromNow()}</span></li>):""}
           </div> 
           <div className="havetopic">
        <h3>最近创建的话题</h3>
        {userlist?userlist.recent_replies.map(item=><li key={item.id}  className="havelist"><NavLink to={`/user/${item.author.loginname}`}><img className="author-pic" src={item.author.avatar_url} alt=""/>  </NavLink><NavLink to={`/post/${item.id}`}><p  className="title">{item.title}</p></NavLink><span className="usertime">{moment(item.last_reply_at).fromNow()}</span></li>):""}
           </div> 
       </div>:""}
        </div> );
    }
}
 
export default User;