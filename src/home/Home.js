import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import './home.css'
import moment from 'moment'
import {Pagination} from 'antd'

class Home extends Component {
    state = { 
        postList:null,
        page:1
     }
    componentDidMount() {
        const{search} = this.props.location
        const{page}=this.state
         const currentPage = search.includes("page")?Number(search.match(/[0-9]{1,2}/)[0]):1
         this.setState({
             page:currentPage
         })
        const type = this.getType()  
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${type}&page=${page}`).then(res=>{
            this.setState({
                postList:res.data,
            })
           }) 
     
    }
    componentDidUpdate(prevProps) {
        const{page}=this.state
        const{search} = this.props.location
        const type = this.getType()
        if(prevProps.location.search !== search ){           
            axios.get(`https://cnodejs.org/api/v1/topics?tab=${type}&page=${page}`).then(res=>{
                this.setState({
                    postList:res.data
                })
               }) 
            }
          
    }
    render() { 
        const{page}=this.state
        const{postList} = this.state
        const{search} = this.props.location
        const type = this.getType()       
        const numArr = [{tab:"all",allNum:1015},{tab:"good",allNum:15},{tab:"weex",allNum:3},{tab:"share",allNum:350},{tab:"ask",allNum:623},{tab:"job",allNum:29}]        
       const pageNum =  numArr.find(type===" "?type==="all" :item=>item.tab.includes(type)).allNum 
        return ( <div>  
            <ul className='list'>
                <li> <NavLink isActive={ ()=> search.includes("all") || search===""} to="/?tab=all">全部</NavLink></li>
                <li> <NavLink isActive={ ()=> search.includes("good") } to="/?tab=good">精华</NavLink></li>
                <li> <NavLink isActive={()=> search.includes("weex") } to="/?tab=weex">weex</NavLink></li>
                <li> <NavLink isActive={()=> search.includes("share")  } to="/?tab=share">分享</NavLink></li>
                <li> <NavLink isActive={()=> search.includes("ask")} to="/?tab=ask">问答</NavLink></li>
                <li> <NavLink isActive ={()=> search.includes("job") } to="/?tab=job">招聘</NavLink></li>
            </ul> 
        {postList?<div className="main">{postList.data.map(item => <li className="comment" key={item.id}>
        <NavLink to={`/user/${item.author.loginname}`}><img className="auther-pic" 
        src={item.author.avatar_url} alt=""/></NavLink><span className="count">
        {item.reply_count}/{item.visit_count}</span> {type==="all" || type===" " ?<button className="tab">
        {item.tab==="share"?"分享":item.tab==="ask"?"问答":item.tab==="job"?"工作":"通用"}
        </button> :type==="good"?<button className="good">精华</button>:""}<NavLink to={`/post/${item.id}`}><p className="title">{item.title}</p></NavLink>
        <span className="time">{moment(item.create_at).fromNow()}</span></li>)}<div><Pagination onChange={this.changeSize}  defaultCurrent={page} defaultPageSize={20}   total={pageNum} /></div></div>:""}
        
        </div>  
        );
    }
    getType = () =>{
        const{search} = this.props.location
         return search.includes('all') || search===""?"all": search.includes('good') ? "good":search.includes('weex')?"weex":search.includes('share')?"share":search.includes('ask')?"ask":search.includes('job')?"job":"all"
    }

    changeSize =(page)=>{     
      const type = this.getType()
     this.props.history.push(`?tab=${type}&page=${page}`)    
     axios.get(`https://cnodejs.org/api/v1/topics?tab=${type}&page=${page}`).then(res=>{
        this.setState({
            postList:res.data
        })
       }) 
      
    }

    // getTopic = (type,page) =>{
    //     axios.get(`https://www.vue-js.com/api/v1/topics?tab=${type}&page=${page}`).then(res=>{
    //         this.setState({
    //             postList:res.data,
    //         })
    //        }) 
    // }
}
 
export default  Home;