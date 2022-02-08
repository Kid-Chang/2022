import React, { useEffect } from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
// import { Form, Input, Button, Checkbox } from 'antd';
function LandingPage() {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/hello").then((res) => {
            console.log(res.data);
        });
    }, []);

    const onClickHandler = () => {
        axios.get("/api/users/logout").then((res) => {
            console.log(res.data);
            if (res.data.success) {
                navigate("/login");
            } else {
                alert("비 로그인 상태");
                navigate("/login");
            }
        });
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <h2>LandingPage</h2>
            <button onClick={onClickHandler}>logout</button>
        </div>
    );
}

export default LandingPage;
