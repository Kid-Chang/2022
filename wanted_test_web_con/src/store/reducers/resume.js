//초기 상태값 설정
const initialState = {
    Education: [],
};

//리듀서 설정
const ResumeReducer = (state = initialState, action) => {
    // console.log("action: ");
    // console.log(action);
    switch (action.type) {
        case "LRESUME/ADD_EDUCATION": {
            return {
                ...state,
                Education: [...state.Education, {}],
            };
        }
        case "RESUME/EDIT_EDUCATION": {
            return {
                ...state,
                Education: [...state.Education, action.data],
            };
        }

        // case "LOGIN/CHANGE_USER_INFO": {
        //     return {
        //         ...state,
        //         userName: action.data.userName,
        //         email: action.data.email,
        //         offerNum: action.data.offerNum,
        //         openNum: action.data.openNum,
        //         point: action.data.point,
        //         profileImage: action.data.profileImage,
        //         wantNum: action.data.wantNum,
        //         phoneNum: action.data.phoneNum,
        //     };
        // }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default ResumeReducer;
