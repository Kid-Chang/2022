/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
// import { USER_SERVER } from "../../../Config";
// import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../../../config";
import { useNavigate } from "react-router-dom";

function RightMenu(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then((response) => {
            if (response.status === 200) {
                navigate("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={"inline"}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <div>
                <Menu mode="inline">
                    <Menu.Item key="upload">
                        <a href="/video/upload">Upload</a>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        <a onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default RightMenu;
