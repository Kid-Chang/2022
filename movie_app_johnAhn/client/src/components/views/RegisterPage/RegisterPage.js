import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const target = e.currentTarget;
        // console.log(target);
        if (target.name === "email") {
            setEmail(target.value);
        }
        if (target.name === "Name") {
            setName(target.value);
        }
        if (target.name === "password") {
            setPassword(target.value);
        }

        if (target.name === "ConfirmPassword") {
            setConfirmPassword(target.value);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
        }

        const body = {
            name: Name,
            email: Email,
            password: Password,
        };
        console.log(body);

        dispatch(registerUser(body)).then((res) => {
            if (res.payload.success) {
                navigate("/login");
            } else {
                alert("Failed to sign up");
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

                <label>Name</label>
                <input
                    name="Name"
                    type="text"
                    value={Name}
                    onChange={onChangeHandler}
                />

                <label>password</label>
                <input
                    name="password"
                    type="password"
                    value={Password}
                    onChange={onChangeHandler}
                />
                <label>Confirm Password</label>
                <input
                    name="ConfirmPassword"
                    type="password"
                    value={ConfirmPassword}
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

export default RegisterPage;
