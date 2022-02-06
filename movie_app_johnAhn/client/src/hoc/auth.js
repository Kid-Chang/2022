import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
    // option
    // null => everyone can enter.
    // true => only login user can enter.
    // false => onley unlogin user can enter.

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        useEffect(() => {
            dispatch(auth()).then((res) => {
                console.log("로그인 상태");
                console.log(res.payload);

                // unlogin status
                if (!res.payload.isAuth) {
                    if (option) {
                        // if option is true, unlogin user can't enter this page.
                        navigate("/login");
                    }
                } else {
                    // login status
                    if (adminRoute && !res.payload.isAdmin) {
                        // first option is "this page is only enter admin",
                        // second option is this, "user hasn't admin authority".
                        navigate("/");
                    } else {
                        if (option === false) {
                            // if option is false, login user can't enter this page.
                            // ex. wanted site, resume tab.
                            // login user only see their own content.
                            // but, unlogin user can see introduction page.
                            navigate("/");
                        }
                    }
                }
            });
        }, []);
        return <SpecificComponent />;
    }

    return AuthenticationCheck;
}
