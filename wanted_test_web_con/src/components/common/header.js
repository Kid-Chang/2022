import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import HeaderLogin from "./header_toolkit";
import SignForm from "./signForm";
import {
    autoLoginAction,
    loginAction,
    setUserInfoAction,
} from "../../store/actions/login";
import LoginReducer from "../../store/reducers/login";
import axios from "axios";
import { ServerSignURL } from "../../pages";
import Search from "./search";
// Link to={}

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    // const [tapLoca, setTapLoca] = useState("home");
    const [showBell, setShowbell] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const dispatch = useDispatch();
    const bellIcon = useRef();
    // let link = document.location.pathname;
    // console.log(link);

    //로그인 및 회원가입 관련.
    const [showSignForm, setShowSignForm] = useState(false);
    const [signUpCase, setSignUpCase] = useState(false);
    const [signInCase, setSignInCase] = useState(false);
    const [serverErrMsg, setServerErrMsg] = useState("");

    // 시작하자마자 jwt랑 id가 로컬스토리지에 있는지 확인하고, 있으면, 그거 사용해서 isLogin을 true로 만들자.
    const { jwt: localJwt, userIdx: localUserIdx } = useSelector(
        (state) => state.LoginReducer,
    );

    const userInfo = useSelector((state) => state.LoginReducer);
    useEffect(() => {
        // console.log("userInfo changed");
        // console.log(userInfo);
    }, [userInfo]);

    const getUserInfo = async () => {
        // console.log("Idx: " + localUserIdx);
        // console.log("jwt: " + localJwt);
        const jwt = localStorage.getItem("jwt");
        const userIdx = localStorage.getItem("userIdx");
        if (jwt !== "") {
            const data = await axios.get(
                `${ServerSignURL}/users/${userIdx}/my-wanted`,
                {
                    headers: {
                        "X-ACCESS-TOKEN": jwt,
                    },
                },
            );
            dispatch(autoLoginAction({ jwt: jwt, userIdx: userIdx }));

            // console.log(data);
            // console.log(data.data.result);
            if (data.data.result !== undefined) {
                const {
                    data: {
                        result: {
                            name: userName,
                            email,
                            point,
                            profileImage,
                            phoneNum,
                            counts: { offerNum, openNum, wantNum },
                        },
                    },
                } = data;

                dispatch(
                    setUserInfoAction({
                        userName: userName,
                        email,
                        offerNum,
                        openNum,
                        point,
                        profileImage,
                        wantNum,
                        phoneNum,
                    }),
                );
                // console.log("its work");
            } else {
                // console.log("정보가 없음");
            }
        }
    };

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const userIdx = localStorage.getItem("userIdx");
        if (jwt && userIdx) {
            console.log("성공" + jwt, userIdx);
            dispatch(autoLoginAction({ jwt: jwt, userIdx: userIdx }));
            dispatch(loginAction({ isLogin: true }));
        }
    }, []);

    useEffect(() => {
        // console.log(localJwt, localUserIdx);
        getUserInfo();
    }, [localJwt, localUserIdx]);

    const onSignClick = () => {
        setShowSignForm(!showSignForm);
        setSignUpCase(false);
        setSignInCase(false);
        setServerErrMsg("");
    };

    //
    const { isLogin: LoginState } = useSelector((state) => state.LoginReducer);
    // console.log(LoginState);
    useEffect(() => setIsLogin(LoginState), [LoginState]);
    // useEffect(() => {
    //     console.log(isLogin);
    //     console.log(LoginState);
    // }, [isLogin]);

    const onBellClick = (e) => {
        if (showBell) {
            bellIcon.current.style =
                "width: 32px; height: 32px; color: black; borderRadius: 50%; position: relative; margin-right: 30px; margin-left: 20px";
            setShowbell(false);
        } else if (!showBell) {
            bellIcon.current.style =
                "background-color: #3366FF; color: white; width: 32px; height: 32px; border-radius:50%;position: relative;margin-right: 30px; margin-left: 20px ";
            setShowbell(true);
        }
    };

    const onProfileClick = (e) => {
        if (showProfile) {
            setShowProfile(false);
        } else if (!showProfile) {
            setShowProfile(true);
        }
    };
    const navigate = useNavigate();
    const onSectionClick = (e) => {
        console.log(e);
        navigate(e);
    };
    const [showSearch, setShowSearch] = useState(false);
    const onSearchClick = () => {
        setShowSearch(!showSearch);
    };

    return (
        <OuterBoxStyle>
            <Row className="justify-content-md-center">
                <div style={{ height: "51px" }}></div>
                <div
                    style={{
                        height: "52px",
                        background: "#fff",
                        position: "fixed",
                        borderBottom: "1px solid  #ececec",
                        zIndex: 500,
                    }}
                ></div>
                <Col
                    style={{
                        maxWidth: "1090px",
                        position: "fixed",
                        backgroundColor: "#fff",
                        zIndex: "900",
                        // borderBottom: "1px solid gray",
                    }}
                >
                    <div
                        bg="light"
                        expand="lg"
                        style={{
                            position: "relative",
                            padding: "0",
                            height: "50px",
                        }}
                    >
                        <div
                            style={{
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <HamburgerMenu>
                                <FontAwesomeIcon icon={faBars} />
                            </HamburgerMenu>
                            {/* <Link to="/">
                                <div>
                                    <img
                                        src="img/header/logo_wanted.png"
                                        alt=""
                                    />
                                </div>
                            </Link> */}
                            <input
                                type="radio"
                                id="로고"
                                name="헤더"
                                onClick={() => onSectionClick("")}
                            />
                            <label htmlFor="로고" className="logo">
                                <img src="img/header/logo_wanted.png" alt="" />
                            </label>

                            <div
                                style={{
                                    maxHeight: "100px",
                                    margin: "0 auto",
                                    position: "relative",
                                    color: "black",
                                    display: "flex",
                                    height: "50px",
                                    paddingTop: "10px",
                                }}
                            >
                                <input
                                    type="radio"
                                    id="채용"
                                    name="헤더"
                                    onClick={() => onSectionClick("jobsfeed")}
                                />
                                <HeaderLabelStyle htmlFor="채용">
                                    채용
                                </HeaderLabelStyle>
                                <input
                                    type="radio"
                                    id="이벤트"
                                    name="헤더"
                                    onClick={() => onSectionClick("events")}
                                />
                                <HeaderLabelStyle htmlFor="이벤트">
                                    이벤트
                                </HeaderLabelStyle>
                                <input
                                    type="radio"
                                    id="직군별연봉"
                                    name="헤더"
                                    onClick={() => onSectionClick("salary")}
                                />
                                <HeaderLabelStyle htmlFor="직군별연봉">
                                    직군별 연봉
                                </HeaderLabelStyle>
                                {isLogin ? (
                                    <>
                                        <input
                                            type="radio"
                                            id="이력서"
                                            name="헤더"
                                            onClick={() =>
                                                onSectionClick("cv/list")
                                            }
                                        />
                                        <HeaderLabelStyle htmlFor="이력서">
                                            이력서
                                        </HeaderLabelStyle>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="radio"
                                            id="이력서"
                                            name="헤더"
                                            onClick={() =>
                                                onSectionClick("cv/intro")
                                            }
                                        />{" "}
                                        <HeaderLabelStyle htmlFor="이력서">
                                            이력서
                                        </HeaderLabelStyle>
                                    </>
                                )}
                                <input
                                    type="radio"
                                    id="커뮤니티"
                                    name="헤더"
                                    onClick={() => onSectionClick("community")}
                                />
                                <HeaderLabelStyle htmlFor="커뮤니티">
                                    커뮤니티<BadgeSytle>New</BadgeSytle>
                                </HeaderLabelStyle>

                                <input
                                    type="radio"
                                    id="프리랜서"
                                    name="헤더"
                                    onClick={() => onSectionClick("")}
                                />
                                <HeaderLabelStyle htmlFor="프리랜서">
                                    프리랜서
                                </HeaderLabelStyle>
                                <input
                                    type="radio"
                                    id="ai합격예측"
                                    name="헤더"
                                    onClick={() => onSectionClick("events")}
                                />
                                <HeaderLabelStyle htmlFor="ai합격예측">
                                    AI 합격예측<BadgeSytle>Beta</BadgeSytle>
                                </HeaderLabelStyle>
                            </div>
                            {/* 검색 */}
                            <div
                                style={{ color: "black" }}
                                onClick={() => onSearchClick()}
                            >
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            </div>
                            {isLogin ? (
                                <HeaderLogin
                                    onBellClick={onBellClick}
                                    showBell={showBell}
                                    bellIcon={bellIcon}
                                    onProfileClick={onProfileClick}
                                    showProfile={showProfile}
                                />
                            ) : (
                                <>
                                    <Button
                                        variant="light"
                                        style={{
                                            fontSize: "0.7rem",
                                        }}
                                        onClick={() => onSignClick()}
                                    >
                                        회원가입/로그인
                                    </Button>
                                    <SignForm
                                        showSignForm={showSignForm}
                                        onSignClick={onSignClick}
                                        signUpCase={signUpCase}
                                        setSignUpCase={setSignUpCase}
                                        setSignInCase={setSignInCase}
                                        signInCase={signInCase}
                                        serverErrMsg={serverErrMsg}
                                        setServerErrMsg={setServerErrMsg}
                                        getUserInfo={getUserInfo}
                                    />
                                </>
                            )}

                            <div
                                style={{
                                    margin: "0 20px 0 20px",
                                    color: "gray",
                                }}
                            >
                                |
                            </div>
                            <Button
                                variant="light"
                                style={{
                                    border: "1px solid gray",
                                    borderRadius: "100px",
                                    color: "gray",
                                    fontSize: "0.7rem",
                                }}
                            >
                                기업 서비스
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Search onSearchClick={onSearchClick} showSearch={showSearch} />
        </OuterBoxStyle>
    );
};

export default Header;
const NavLinkStyle = styled(Link)`
    // margin-left: 7px;
    // margin-right: 7px;
    // font-size: 0.9rem;
    // position: relative;
    // line-height: 2;
    // border-bottom: 2px solid white;
    // color: black;
    // padding: 0 10px 0 10px;
    // height: 100%;
    // // &:hover {
    // //     border-bottom: 2px solid gray;
    // // }
`;
const HeaderLabelStyle = styled.label`
    margin-left: 7px;
    margin-right: 7px;
    font-size: 0.9rem;
    position: relative;
    display: block;
    line-height: 2;
    border-bottom: 2px solid white;
    color: black;
    padding: 0 10px 0 10px;
    height: 100%;
    &:hover {
        border-bottom: 2px solid gray;
    }
`;

const BadgeSytle = styled.div`
    color: #87ceeb;
    position: absolute;
    right: -17px;
    top: -8px;
    font-size: 0.4px;
    height: 100%;
`;

const HamburgerMenu = styled.div`
    margin: 10px;
`;

const OuterBoxStyle = styled.div`
    & input[type="radio"] {
        display: none;
        //이거확인
    }
    & input:checked + label {
        border-bottom: 2px solid #36f;
    }
    & input:checked + .logo {
        border-bottom: 0;
    }
`;

// 로그인별 상세 페이지 변경하도록.

// const { header: page } = useSelector((state) => state.LoginReducer);

// {
//     /* <div>
//                 {page === "index" && (
//                     <Link to="/login">
//                         <Button>로그인</Button>
//                     </Link>
//                 )}

//                 {page === "login" && (
//                     <Link to="/">
//                         <Button>뒤로가기</Button>
//                     </Link>
//                 )}

//                 {page === "home" && (
//                     <Link to="/">
//                         <Button>로그아웃</Button>
//                     </Link>
//                 )}
//             </div> */
// }

// 호버시 드랍다운 메뉴 표시.
// {
//     /* <NavDropdown
//                                 title="Link"
//                                 id="navbarScrollingDropdown"
//                             >
//                                 <NavDropdown.Item href="#action3">
//                                     Action
//                                 </NavDropdown.Item>
//                                 <NavDropdown.Item href="#action4">
//                                     Another action
//                                 </NavDropdown.Item>
//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item href="#action5">
//                                     Something else here
//                                 </NavDropdown.Item>
//                             </NavDropdown> */
// }
