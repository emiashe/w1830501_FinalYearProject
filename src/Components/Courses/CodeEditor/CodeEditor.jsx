import React, {useRef, useState} from 'react';
import { Editor } from "@monaco-editor/react";
import './CodeEditor.css'
import ContentTop from '../../Dashboard/ContentTop/ContentTop';

import Output from './Output'
import Lesson from './Lesson';

const CodeEditor = () => {

    const editorRef = useRef();

    const [value, setValue] = useState('')
    


    const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    }

    return (

      <div className='main-content'>
            
            <ContentTop />
        <div className="editor-wrapper">

<div className="text-container">
          <h2 className="section-title">Lesson:</h2>
          <Lesson/>
        
        </div>
        {/* Left side: Monaco Editor */}
        <div className="editor-container">
          <h2 className="section-title">Editor:</h2>
          <div className="header">
            <p className="language-label">Language:</p>
            <p className="language-value">JavaScript</p>
          </div>
          <Editor
            height="85%"
            theme="vs-dark"
            language="javascript"
            defaultValue=
'function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("Emina");'

            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
  
        {/* Right side: Output */}
        <div className="text-container">
          <h2 className="section-title">Output:</h2>
          <Output editorRef={editorRef} />
        </div>
  




        </div>
        </div>
        
      );
};

export default CodeEditor;