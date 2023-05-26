import React from "react";

import "./Names.css";

const Names = (props) => {
    return (
        <>
            <div className="result-container"> 
                <li key={props.children}><h3> {props.children} </h3></li>
            </div>
        </>
    );
}

export default Names;