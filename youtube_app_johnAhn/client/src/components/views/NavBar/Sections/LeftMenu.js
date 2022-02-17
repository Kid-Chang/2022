import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
    return (
        <div style={{ display: "flex" }}>
            <Menu mode={"inline"}>
                <Menu.Item key="mail">
                    <a href="/">Home</a>
                </Menu.Item>
            </Menu>
            <Menu mode={"inline"}>
                <Menu.Item key="subscription">
                    <a href="/subscription">subscription</a>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default LeftMenu;
