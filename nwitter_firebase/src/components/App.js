import AppRouter from "./Router";
import { useEffect, useState } from "react";
// import firebase, { authService } from "../fbase";
import { getAuth } from "firebase/auth";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            // console.log(user);
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }

            setInit(true);
        });
    });
    // console.log(getAuth.currentUser);
    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                "Initializing"
            )}
            <div>footer</div>
        </>
    );
}

export default App;
