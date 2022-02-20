//초기 상태값 설정
const initialState = {
    isLogin: false,
    jwt: "",
    userIdx: "",
    userName: "홍길동",
    email: "",
    offerNum: 0,
    openNum: 0,
    phoneNum: "",
    point: 0,
    profileImage: null,
    wantNum: 0,
};

//리듀서 설정
const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN/CHANGE_LOGIN_VALUE": {
            return {
                ...state,
                isLogin: action.data.isLogin,
            };
        }
        case "LOGIN/CHANGE_USER_VALUE": {
            return {
                ...state,
                userIdx: action.data.userIdx,
                jwt: action.data.jwt,
            };
        }
        case "LOGIN/CHANGE_USER_INFO": {
            return {
                ...state,
                userName: action.data.userName,
                email: action.data.email,
                offerNum: action.data.offerNum,
                openNum: action.data.openNum,
                point: action.data.point,
                profileImage: action.data.profileImage,
                wantNum: action.data.wantNum,
                phoneNum: action.data.phoneNum,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default LoginReducer;
