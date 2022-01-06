import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./fbase"; // 이런식으로 initial한 값을 import만 해놓으면 문제X.
// console.log(firebase);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
