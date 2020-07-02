import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import './post.css'
import { LikeOutlined} from '@ant-design/icons';
import { message} from 'antd';
import E from 'wangeditor'
import { NavLink } from 'react-router-dom';
class Post extends Component {
    state = { 
        postlist:null,
        ups:"",
        textVal:""
     }
    componentDidMount(){  
    const {id}= this.props.match.params
        axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(
            res=>{
             const topic = res.data.data
             topic.replies.forEach(item=>{
                 item.textarea = false
             })  
            this.setState({
               postlist:topic                   
            })
            const editor = new E(this.editor)
            editor.customConfig.menus = [
                'head',
                'bold',
                'italic',
                'underline'
            ]
            editor.customConfig.onchange = html =>{
                this.textVal(html)
            }
            editor.create() 

            }  
        ) 
    }
    textVal = (html) =>{
        this.setState({
            textVal:html
        })
    }
    componentDidUpdate(){
        const {id}= this.props.match.params
        axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(
            res=>{
            this.setState({
               postlist:res.data.data    
            })
            }  
        )      
    }
    render() { 
     const{postlist} =this.state
     const author_id = localStorage.getItem("author_id")
     return ( <div className="post">        
    {postlist?<div> <div className="header1"><h2 className="title1">{postlist.title}</h2>·<span>发布于 {moment(postlist.create_at).fromNow()}</span>· <span>作者 {postlist.author.loginname}</span>· <span>{postlist.visit_count} 浏览</span>·<span>来自 {postlist.tab} </span></div><div dangerouslySetInnerHTML={{ __html:postlist.content }}></div><div className='replay'>{postlist.replies.map(item=><li className='everycomment clearfix' key={item.id}><div className='postuser'><NavLink to={`/user/${item.author.loginname}`}><img className="postpic" src={item.author.avatar_url} alt=""/></NavLink ><NavLink to={`/user/${item.author.loginname}`}><span>{item.author.loginname}</span></NavLink ><span>{moment(item.create_at).fromNow()}</span><div dangerouslySetInnerHTML={{ __html:item.content }}></div>{item.textarea?<textarea name="" id="" cols="50" rows="3"></textarea>:""}</div><span className="zan" onClick={()=>this.ups(item.id)} ><LikeOutlined  className="heartzan" style={{color: item.ups.includes(author_id)?"red":""}}/> {item.ups.length}</span></li>)}</div><div className="addcom"><div ref={editor =>this.editor = editor} id="editor" className="addcomment"></div><button onClick={this.addcomment}>回复</button></div></div> :''}
        </div> );
        // <span className="replay1" onClick={()=>this.handelTextarea(item.id)}><RotateLeftOutlined/></span>
    }


    handlerVal = (event)=>{
        this.setState({
        inputVal:event.target.value
        })
    }

//    handelTextarea =(id)=>{   
//        const {postlist} = this.state
//        const newplist = {...postlist}
//        newplist.replies.forEach(item=>{
//          if(item.id === id){
//              item.textarea = !item.textarea
//          }
//          else{
//              item.textarea = false
//          }
        
//      })
//      this.setState({
//          postlist:newplist
//      })
//    } 

//点赞
    ups = (idd)=>{
      const token =  localStorage.getItem("token")
      if(token){
      axios.post(`https://cnodejs.org/api/v1/reply/${idd}/ups`,{accesstoken:token}).then(
        res=>{ 
        const author_id = localStorage.getItem("author_id")    
        const newslist = {...this.state.postlist}
        const myReplay = newslist.replies.find(item=> item.id === idd) 
       if(res.data.action === "up"){
         myReplay.ups.push(author_id)
       }
       else{
        myReplay.ups = myReplay.ups.filter(item=> item.id !== author_id)
       }
        }                  
      ) 
} else{
    message.error('请先登录')
}
    }
   
//添加评论
 addcomment = () =>{
    const {id}= this.props.match.params
    const{textVal}=this.state
    const token =  localStorage.getItem("token")
    axios.post(`https://cnodejs.org/api/v1/topic/${id}/replies`,{accesstoken:token ,content:textVal}).then(
        res=>{
        this.setState({
          ups:res.data,        
        })        
        }    
    )
 }

}
 
export default Post;