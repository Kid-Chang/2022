import { useState } from "react";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const auth = getAuth();

    const onChange = (e) => {
        console.log(e.target.name);
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        let data;
        try {
            if (newAccount) {
                //create login
                data = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );
            } else {
                //log in
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
            // console.log(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };

    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        // console.log(e.target. name);
        let provider;
        if (name === "google") {
            //do something
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            //do somethings
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(auth, provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};
export default Auth;
