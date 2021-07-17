import React, { Component } from 'react'
import CodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-coy.css';

export class Editor extends Component {
    constructor(props){
        super(props);
        this.state={
            code:''
        }
    }
    render() {
        const {language,filename,codeMerge,active}=this.props
        let lang= languages.markup

        if(language=="markup"){
            lang=languages.markup
        }
        else{
            lang=languages.css
        }
        // else if(language=="js"){
        //     lang=languages.js
        // }

        return (
            <div className="editor" style={{display:active?'unset':'none'}}>
                <div className="filename">
                    {filename}
                </div>
                <div>
                <CodeEditor
        value={this.state.code}
        onValueChange={code => this.setState({ code },()=>{
            codeMerge(code,language)
        })}
        highlight={code => highlight(code, lang)}
        padding={10}
        style={{
        marginTop:22,
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          overflow:'scroll',
          minHeight:800,
        maxWidth:"100%",
          borderColor:'transparent'
        }}
      />
                </div>
                
            </div>
        )
    }
}

export default Editor
