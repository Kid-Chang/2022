import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const target = e.currentTarget;
        // console.log(target);
        if (target.name === "email") {
            setEmail(target.value);
        }
        if (target.name === "password") {
            setPassword(target.value);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const body = {
            email: Email,
            password: Password,
        };
        console.log(body);

        dispatch(loginUser(body)).then((res) => {
            if (res.payload.loginSuccess) {
                navigate("/");
            } else {
                alert("err");
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
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={Email}
                    onChange={onChangeHandler}
                />

                <label>password</label>
                <input
                    name="password"
                    type="password"
                    value={Password}
                    onChange={onChangeHandler}
                />
                <br />
                <br />
                <br />
                <button>LOGIN</button>
            </form>
        </div>
    );
}

export default LoginPage;
