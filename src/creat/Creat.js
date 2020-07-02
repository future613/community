import React, { Component } from 'react'
import './creat.css'
import E from 'wangeditor'
import axios from 'axios'
// import { message} from 'antd';
class Creat extends Component {
    state = { 
        creat:"",
       selectVal:"",
       inputVal:"",
       textVal:""
     }
     componentDidMount() {
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
     
    render() { 
     const {selectVal,inputVal} =this.state
      return ( <div className="creattopic">
      <h3>发布话题</h3>
      <span>选择板块:</span>   
           <select className="select" value={selectVal} onChange={(event)=>this.handleChange(event,"selectVal")}>
            <option value="weex">请选择一个选项</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
          <br/>
          <input className="title5" placeholder="标题字数 10 字以上" type="text" value={inputVal} onChange={(event)=>this.handleChange(event,"inputVal")}/>
          <div className="contant"><div ref={editor => this.editor =editor}></div>
          <button onClick={this.login}>提交</button></div>

    </div> );
    }
    handleChange = (event,name) =>{
        this.setState({
        [name]:event.target.value 
        })
      
    }
    textVal = (html) =>{
        this.setState({
            textVal:html
        })
    }
    login =()=>{
        const {selectVal,inputVal,textVal} =this.state       
        const token = localStorage.getItem("token")
        // selectVal !== "ask" || selectVal !== "job" || selectVal !== "share"? message.error('请选择一个板块'):!inputVal.length>10? message.error('标题长度要大于10'):!textVal? message.error('内容不能为空'): 
        axios.post("https://cnodejs.org/api/v1/topics",{title:inputVal,tab:selectVal,accesstoken:token,content:textVal}).then(
            res=>{
            this.props.history.push(`/post/${res.data.topic_id}`) 
            }  
        )          
    }
  }
   
  export default Creat;
