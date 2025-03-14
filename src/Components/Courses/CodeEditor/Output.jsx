import React, {useRef, useState} from 'react';
import { executeCode } from '../../../api'
import './CodeEditor.css'


const Output = ({editorRef}) => {

    const [output, setOutput] = useState(null); // Stores the output
    const [error, setError] = useState(null); // Stores error messages
    



    const runCode = async () => {

        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        
        try {
            const {run:result} = await executeCode(sourceCode);
            setOutput(result.output)
            setError(null); 
 
        } catch (err) {
            setOutput(null); // Clear output
            setError(
                err.run?.stderr || err.message || "An unexpected error occurred."
              ); // Extract and set the error message   

        } 
            


    }


    return (
        <div className="output-wrapper">
      <div className="output-header">
        <button className="run-button" type="submit" onClick={runCode}>
          Run Code
        </button>
      </div>
      <div className="output-area">
        {error ? (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        ) : (

          <div>
            {output
                            ? output.split('\n').map((line, index) => (
                                  <div key={index}>{line}</div>
                              ))
                            : "Click 'Run Code' to see output here."}
            </div>
        )}
      </div>
    </div>

    )
}

export default Output;