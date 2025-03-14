import React from 'react';
import './CodeEditor.css';

const Lesson = () => {
    const lessonContent = `
        JavaScript - Introduction

        A function in JavaScript is a reusable block of code designed to perform a specific task.
        Functions allow us to avoid repetition and make code modular.

        Function Definition:
        function greet(name) {
            console.log("Hello, " + name + "!");
        }

        Explanation:
        - 'function' is the keyword that defines a function.
        - 'greet' is the function name.
        - '(name)' is the parameter, which acts as a placeholder for values.
        - 'console.log' prints the message to the console.

        Function Call:
        greet("Emina");

        - Here, "Emina" is passed as an argument to the function.
        - The output will be: Hello, Emina!
        
        You can call the function with different names to personalize the greeting!
    `;

    return (
        <div className="lesson-wrapper">

            <div className="lesson-content">
                {lessonContent.split('\n').map((line, index) => (
                    <div key={index} className="lesson-line">
                        {line.trim()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lesson;