//action 설정
export const EducationAddAction = (data) => {
    return {
        type: "RESUME/ADD_EDUCATION",
        data: data,
    };
};

export const EducationEditAction = (data) => {
    return {
        type: "RESUME/EDIT_EDUCATION",
        data: data,
    };
};

// export const autoLoginAction = (data) => {
//     return {
//         type: "LOGIN/CHANGE_USER_VALUE",
//         data: data,
//     };
// };

// export const setUserInfoAction = (data) => {
//     return {
//         type: "LOGIN/CHANGE_USER_INFO",
//         data: data,
//     };
// };
