import React, { Component } from 'react'
import Axios from 'axios'
import './App.css'
import Editor from './components/Editor'

export class App extends Component {

  constructor(props){
    super(props);
    this.state={
        code:'',
        css:'',
        html:'',
        js:'',
        activeFile:'markup'
    }
}

  codeMerge=(code,language)=>{ //function to assign a tag to the language

    let css=this.state.css
    let html=this.state.html

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const head = document.getElementsByTagName('head')[0];

    if(language=="markup"){
      document.body.innerHTML = code;
      this.setState({html:code})
    }
    
    if(language=="css"){  
    if(document.getElementsByTagName('style')[0])
    {
      document.getElementsByTagName('style')[0].innerHTML=code
      this.setState({css:code})
    }
    else{
      const cssCode = document.createElement('style');
      var textnode = document.createTextNode(code)
      cssCode.appendChild(textnode)
      head.appendChild(cssCode); 
    }
    }

    if(language=="js"){

      if(document.getElementsByTagName('script')[0])
      {
        document.getElementsByTagName('script')[0].innerHTML=code

        //This is done because html won't recongnize the later added js code
        //Basically a page reload in iframe

        let srcc=`<html><head><style>${css}</style><script>${code}</script><body>${html}</body></html>`
        iframe.srcdoc=srcc
      }
      else{
        const jsCode = document.createElement('script');
        var textnode = document.createTextNode(code)
        jsCode.appendChild(textnode)
        head.appendChild(jsCode);
      }
    }

  }

  setActiveFile=(file)=>{
    this.setState({
      activeFile:file
    })

  }
  /*
  function PostData() {
    const url = ""
    const [data, setData] = useState({
      api_dev_hey : "",
      api_paste_code : "",
      api_paste_expire_date : "",
      api_paste_format : ""
    })
  }

  shareFile=()=>{
    const url = 'https://pastebin.com/api/api_post.php'
    const data = ""
    const language = ""
    if(this.state.activeFile=="markup")
    {
      data = this.state.html
      language = "HTML"
    }
    if(this.state.activeFile=="css")
    {
      data = this.state.css
      language = "CSS"
    }
    if(this.state.activeFile=="js")
    {
      data = this.state.js
      language = "JavaScript"
    }
    Axios.post(url,{
      api_dev_key : 'oEVvMuvfoVe3_PxHdMgy64KAam_rESL5',
      api_paste_code : data,
      api_paste_expire_date : "N",
      api_paste_format : language
    })
    .then(res=> {
      console.alert(res.data)
    })
  }*/

  render() {
    return (
      <section>
        <section className="header">
           Easy Web Live Code Editor
        </section>
        <section className="maincontainer">
          <section className="filexp">
            <h3>File Explorer</h3>
            <ul>
              <li onClick={()=>this.setActiveFile("markup")}>
                index.html
              </li>
              <li onClick={()=>this.setActiveFile("css")}>
                index.css
              </li>
              <li onClick={()=>this.setActiveFile("js")}>
                index.js
              </li>
            </ul>
            <button className="share" onClick={() => this.shareFile()} >Share File</button>
          </section>
          <section className="editors">
              <Editor active={this.state.activeFile=="markup"?true:false} filename="HTML" language="markup" codeMerge={this.codeMerge}/>
              <Editor active={this.state.activeFile=="css"?true:false} filename="CSS" language="css" codeMerge={this.codeMerge}/>
              <Editor active={this.state.activeFile=="js"?true:false} filename="JavaScript" language="js" codeMerge={this.codeMerge}/>
          </section>
          <iframe ref="iframe" className="output" id="output" frameBorder= "0">

          </iframe >
        </section>
        
      </section>
    )
  }
}

export default App
