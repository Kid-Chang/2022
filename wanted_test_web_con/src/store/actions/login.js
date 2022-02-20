//action 설정
export const loginAction = (data) => {
    return {
        type: "LOGIN/CHANGE_LOGIN_VALUE",
        data: data,
    };
};

export const autoLoginAction = (data) => {
    return {
        type: "LOGIN/CHANGE_USER_VALUE",
        data: data,
    };
};

export const setUserInfoAction = (data) => {
    return {
        type: "LOGIN/CHANGE_USER_INFO",
        data: data,
    };
};
