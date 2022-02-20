import { faBell } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/login";

const HeaderLogin = ({
    onBellClick,
    showBell,
    bellIcon,
    onProfileClick,
    showProfile,
}) => {
    const dispatch = useDispatch();
    const onLogOutClick = () => {
        dispatch(loginAction({ isLogin: false }));
        localStorage.setItem("jwt", "");
        localStorage.setItem("userIdx", "");
    };
    return (
        <>
            <OuterBoxSyle>
                <div>
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            color: "black",
                            borderRadius: "50%",
                            position: "relative",
                            marginRight: "30px",
                            marginLeft: "20px",
                        }}
                        onClick={() => onBellClick()}
                        ref={bellIcon}
                    >
                        <div
                            style={{
                                position: "relative",
                                left: "50%",
                                top: "50%",
                                transform: "translateY(-50%) translateX(-30%)",
                            }}
                        >
                            <FontAwesomeIcon icon={faBell} size="lg" />
                        </div>
                    </div>
                    {showBell ? (
                        <>
                            <AlertWindow>
                                <ToolKit>
                                    <FontAwesomeIcon icon={faExclamation} />
                                    <div>
                                        알림 내역이 없습니다.
                                        <br /> 새로운 알림이 오면 알려드릴게요!
                                    </div>
                                </ToolKit>
                            </AlertWindow>
                            <AlertWindowBox>
                                <AlertWindowOutBox
                                    onClick={() => {
                                        onBellClick();
                                    }}
                                ></AlertWindowOutBox>
                            </AlertWindowBox>
                        </>
                    ) : null}
                </div>

                <AvatarBorder onClick={() => onProfileClick()}>
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        src="https://static.wanted.co.kr/images/profile_default.png"
                        alt=""
                    />
                </AvatarBorder>
                {showProfile ? (
                    <>
                        <ProfileWindow>
                            <ToolKit>
                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/mywanted"
                                    data-lnb-kind="myWanted"
                                    data-badge="false"
                                >
                                    <span>MY 원티드</span>
                                </ProfileItemButton>

                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/profile/matching"
                                >
                                    <span>프로필</span>
                                </ProfileItemButton>
                                <MidBar />
                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/status/applications"
                                >
                                    <span>지원 현황</span>
                                </ProfileItemButton>

                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/profile/status"
                                >
                                    <span>제안받기 현황</span>
                                </ProfileItemButton>

                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/profile/likes"
                                >
                                    <span>좋아요</span>
                                </ProfileItemButton>

                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/profile/bookmarks"
                                >
                                    <span>북마크</span>
                                </ProfileItemButton>
                                <MidBar />
                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/referral"
                                >
                                    <span>추천</span>
                                </ProfileItemButton>

                                <ProfileItemButton
                                    onClick={() => onProfileClick()}
                                    to="/profile/point"
                                >
                                    <span>포인트</span>
                                </ProfileItemButton>

                                <ProfileItemButton
                                    to="/"
                                    onClick={() => onLogOutClick()}
                                    style={{
                                        backgroundColor: "#f7f7f7",
                                        marginTop: "auto",
                                        height: "50px",
                                        borderTop: "1px solid #ececec",
                                        borderRadius: "0",
                                    }}
                                >
                                    <span>로그아웃</span>
                                </ProfileItemButton>
                            </ToolKit>
                        </ProfileWindow>
                        <AlertWindowBox>
                            <AlertWindowOutBox
                                onClick={() => onProfileClick()}
                            ></AlertWindowOutBox>
                        </AlertWindowBox>
                    </>
                ) : null}
            </OuterBoxSyle>
        </>
    );
};

export default HeaderLogin;

const MidBar = styled.div`
    display: block;
    width: 100%;
    height: 1px;
    // background-color: #f7f7f7;
    margin: 9px 7px;
    background-color: #ececec;
`;

const ProfileItemButton = styled(Link)`
    height: 34px;
    padding: 8px;
    width: 100%;
    border-radius: 10px;
    font-size: 14px;
    color: #333;
    &:hover {
        color: #333;
        background-color: #f7f7f7;
    }
`;

const AvatarBorder = styled.div`
    color: black;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
`;

const OuterBoxSyle = styled.div`
    display: flex;
    align-items: center;
`;

const ToolKit = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const PopUpWindowStyle = styled.div`
    background-color: black;
    z-index: 200;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2),
        0 6px 40px 0 rgba(0, 0, 0, 0.19);

    & {
        background: #ffff;
        border-radius: 30px;
    }
    &:after,
    &:before {
        bottom: 100%;
        left: 50%;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    &:after {
        border-color: rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
        border-width: 4px;
        margin-left: -4px;
    }
    &:before {
        border-color: rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
        border-width: 10px;
        margin-left: -10px;
    }
`;

const ProfileWindow = styled(PopUpWindowStyle)`
    padding-top: 14px;
    width: 194px;
    height: 381px;
    top: 60px;
    // transform: translateX(-1%);
    position: absolute;
    & {
        background: #ffff;
        border-radius: 10px;
    }
    overflow: hidden;
`;

const AlertWindow = styled(PopUpWindowStyle)`
    width: 392px;
    height: 200px;
    top: 60px;
    transform: translateX(-41%);
    position: absolute;
`;

const AlertWindowBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const AlertWindowOutBox = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
`;
