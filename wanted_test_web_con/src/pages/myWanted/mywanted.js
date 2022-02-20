import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";

export const MyWanted = () => {
    // const [userName, setUserName] = useState("dummy");
    // const [userEmail, setUserEmail] = useState("abc@abc.com");
    // const [userPhoneNum, setUserPhoneNum] = useState("010-1234-5678");
    const {
        isLogin,
        email,
        userName,
        phoneNum,
        wantNum,
        point,
        openNum,
        offerNum,
        userIdx,
        jwt,
    } = useSelector((state) => state.LoginReducer);
    const changeCheck = useSelector((state) => state.LoginReducer);
    useEffect(() => {
        console.log("itswork");
    }, [isLogin]);
    // setUserEmail(email);
    // setUserName(name);
    // setUserPhoneNum(phoneNum);
    const [likeList, setLikeList] = useState([]);
    const [bookmarkList, setBookmarkList] = useState([]);
    const [applicationsList, setApplicationsList] = useState([]);
    const getData = async () => {
        const applicationsData = await axios.get(
            `${ServerSignURL}/users/${userIdx}/applications`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        console.log(applicationsData.data);
        setApplicationsList(applicationsData.data.result);

        const likeData = await axios.get(
            `${ServerSignURL}/users/${userIdx}/bookmarks`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        setBookmarkList(likeData.data.result);
        // console.log(likeData.data.result);

        const bookmarkData = await axios.get(
            `${ServerSignURL}/users/${userIdx}/likes`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        setLikeList(bookmarkData.data.result);
        // console.log(bookmarkData.data.result);
    };
    useEffect(() => getData(), [userIdx]);

    return (
        <div style={{ backgroundColor: "rgb(248,248,248)", height: "1800px" }}>
            {applicationsList && (
                <Row className="justify-content-md-center">
                    <Col style={{ maxWidth: "1090px", marginLeft: "30px" }}>
                        <OuterTitleStyle>MY 원티드</OuterTitleStyle>
                        <OuterBoxStyle>
                            <div>
                                <ProfileOuterBoxStyle data-cy="mywanted-profile">
                                    <ProfileTopBoxStyle>
                                        <ProfileIcon
                                            style={{
                                                backgroundImage:
                                                    "url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png)",
                                            }}
                                        >
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </ProfileIcon>
                                        <a href="/profile/matching?level=1">
                                            <StyledDl>
                                                <dt>{userName}</dt>
                                                <dd
                                                    style={{
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    {email}
                                                </dd>
                                                <dd>{phoneNum}</dd>
                                            </StyledDl>
                                        </a>
                                        <InterestButtonStyle>
                                            <a href="/profile/interests">
                                                <p>
                                                    <em>관심사</em>
                                                    <span>
                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M4.22 9.72a.75.75 0 001.06 1.06l4.25-4.25a.75.75 0 000-1.06L5.28 1.22a.75.75 0 00-1.06 1.06L7.94 6 4.22 9.72z"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                </p>
                                            </a>
                                        </InterestButtonStyle>
                                    </ProfileTopBoxStyle>
                                    <ProfilePointBoxStyle>
                                        <div data-cy="mywanted-point">
                                            <a href="/profile/point">
                                                <span>포인트 &nbsp;</span>
                                                <strong>{point}P</strong>
                                            </a>
                                        </div>
                                    </ProfilePointBoxStyle>
                                    <ProfileMidBoxStyle>
                                        <div data-cy="mywanted-matchup-status">
                                            <div>
                                                <Link to="/profile/status?type=matchup-likes">
                                                    <span>
                                                        원해요&nbsp;
                                                        <button
                                                            type="button"
                                                            className="wantBtn"
                                                        >
                                                            <svg
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <g
                                                                    fill="#aaa"
                                                                    fillRule="evenodd"
                                                                >
                                                                    <path
                                                                        fillRule="nonzero"
                                                                        d="M15.266 20.658A9.249 9.249 0 0112 21.25a9.25 9.25 0 010-18.5 9.21 9.21 0 016.54 2.71A9.217 9.217 0 0121.25 12a9.213 9.213 0 01-2.71 6.54.75.75 0 101.061 1.062A10.713 10.713 0 0022.75 12c0-2.89-1.146-5.599-3.149-7.601A10.717 10.717 0 0012 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75c1.31 0 2.591-.235 3.794-.688a.75.75 0 10-.528-1.404z"
                                                                    ></path>
                                                                    <path d="M13 16a1 1 0 11-2 0 1 1 0 012 0"></path>
                                                                    <path
                                                                        fillRule="nonzero"
                                                                        d="M11.25 7v5a.75.75 0 101.5 0V7a.75.75 0 10-1.5 0z"
                                                                    ></path>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </span>
                                                    <strong>{wantNum}</strong>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link to="/profile/status?type=matchup-opens">
                                                    <span>열람&nbsp;</span>
                                                    <strong>{openNum}</strong>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link to="/profile/status?type=matchup-offers">
                                                    <span>받은 제안&nbsp;</span>
                                                    <strong>{offerNum}</strong>
                                                </Link>
                                            </div>
                                        </div>
                                    </ProfileMidBoxStyle>
                                    <ProfileBottomBoxStyle>
                                        <div data-cy="mywanted-setting">
                                            <Link to="/profile/settings">
                                                계정 설정&nbsp;
                                            </Link>
                                        </div>
                                    </ProfileBottomBoxStyle>
                                </ProfileOuterBoxStyle>
                            </div>
                            <RightContentOuterstyle>
                                <RightItemStyle
                                    style={{
                                        height: "170px",
                                        padding: "26px 0 34px",
                                    }}
                                >
                                    <div className="Summary">
                                        <h2 className="Summary_title">
                                            지원 현황
                                        </h2>
                                        <div className="Summary_ulbox">
                                            <ul
                                                className="Summary_status"
                                                data-cy="mywanted-summary"
                                            >
                                                <li>
                                                    <Link
                                                        to="/status/applications?status=accept"
                                                        className="firstchild"
                                                        data-status-kind="applyDone"
                                                    >
                                                        <em className="">
                                                            {
                                                                applicationsList.registerNum
                                                            }
                                                        </em>
                                                        <span>지원 완료</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/status/applications?status=pass"
                                                        className=""
                                                        data-status-kind="pass"
                                                    >
                                                        <em className="">
                                                            {
                                                                applicationsList.passNum
                                                            }
                                                        </em>
                                                        <span>서류 통과</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/status/applications?status=hire"
                                                        className=""
                                                        data-status-kind="hire"
                                                    >
                                                        <em className="">
                                                            {
                                                                applicationsList.finalPassNum
                                                            }
                                                        </em>
                                                        <span>최종 합격</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/status/applications?status=reject"
                                                        className=""
                                                        data-status-kind="rejected"
                                                    >
                                                        <em className="">
                                                            {
                                                                applicationsList.failNum
                                                            }
                                                        </em>
                                                        <span>불합격</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </RightItemStyle>
                                <RightItemStyle
                                    style={{
                                        height: "370px",
                                        padding: "26px 0 31px",
                                    }}
                                >
                                    <ProfileLevelProfileLevel className="ProfileLevel_ProfileLevel">
                                        <div className="ProfileLevel_top">
                                            <h2 className="ProfileLevel_title">
                                                프로필
                                                <span
                                                    className="Badge_"
                                                    style={{
                                                        backgroundColor:
                                                            "rgb(51, 102, 255)",
                                                        width: "16px",
                                                        height: "16px",
                                                    }}
                                                >
                                                    <svg
                                                        className=""
                                                        width="6"
                                                        height="6"
                                                        viewBox="0 0 6 6"
                                                    >
                                                        <g
                                                            fill="#fff"
                                                            fillRule="nonzero"
                                                        >
                                                            <path
                                                                d="M6.647 11L6.647 7.259 6.688 7.259 9.158 11 11 11 11 5 9.353 5 9.353 8.357 9.322 8.357 7.089 5 5 5 5 11z"
                                                                transform="translate(-123 -375) translate(20 365) translate(98 5)"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </h2>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "70%",
                                                margin: "0 auto",
                                                paddingTop: "20px",
                                                height: "120px",
                                            }}
                                        >
                                            <progress
                                                id="file"
                                                max="100"
                                                value="60"
                                            ></progress>
                                        </div>
                                        <p className="LevelButtons_subtitle">
                                            간단한 소개만 작성해도 면접 제안을
                                            받을 수 있어요!
                                        </p>
                                        <button className="LevelButtons_button">
                                            <span className="Button_Button__label">
                                                간단 이력 추가하고 매치업
                                                시작하기
                                            </span>
                                        </button>
                                    </ProfileLevelProfileLevel>
                                </RightItemStyle>
                                <RightItemStyle style={{ height: "1036px" }}>
                                    <OptionOuterBox>
                                        <BookMarkBox>
                                            <div className="List_header">
                                                <h2>북마크</h2>
                                                <Link
                                                    to="/profile/bookmarks"
                                                    className="count"
                                                >
                                                    총 {bookmarkList.length}개
                                                    전체보기
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M4.22 9.72a.75.75 0 001.06 1.06l4.25-4.25a.75.75 0 000-1.06L5.28 1.22a.75.75 0 00-1.06 1.06L7.94 6 4.22 9.72z"
                                                        ></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                            <ul>
                                                {bookmarkList &&
                                                    bookmarkList.map(
                                                        (data, idx) => {
                                                            if (idx < 2) {
                                                                return (
                                                                    <OneItem
                                                                        key={
                                                                            idx
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={`/wd/${data.positionIdx}`}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    data.image
                                                                                }
                                                                                alt=""
                                                                            />

                                                                            <div className="Item_Text">
                                                                                <h3>
                                                                                    {
                                                                                        data.positionName
                                                                                    }
                                                                                </h3>
                                                                                <div>
                                                                                    <p>
                                                                                        {
                                                                                            data.companyName
                                                                                        }
                                                                                    </p>
                                                                                    <span>
                                                                                        서울·한국
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </OneItem>
                                                                );
                                                            }
                                                        },
                                                    )}
                                            </ul>
                                        </BookMarkBox>
                                        <LikeBox>
                                            <div className="List_header">
                                                <h2>좋아요</h2>
                                                <Link
                                                    to="/profile/likes"
                                                    className="count"
                                                >
                                                    총 {likeList.length}개
                                                    전체보기
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M4.22 9.72a.75.75 0 001.06 1.06l4.25-4.25a.75.75 0 000-1.06L5.28 1.22a.75.75 0 00-1.06 1.06L7.94 6 4.22 9.72z"
                                                        ></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                            <ul>
                                                {" "}
                                                {likeList &&
                                                    likeList.map(
                                                        (data, idx) => {
                                                            if (idx < 2) {
                                                                return (
                                                                    <OneItem
                                                                        key={
                                                                            idx
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={`/wd/${data.positionIdx}`}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    data.image
                                                                                }
                                                                                alt=""
                                                                            />

                                                                            <div className="Item_Text">
                                                                                <h3>
                                                                                    {
                                                                                        data.positionName
                                                                                    }
                                                                                </h3>
                                                                                <div>
                                                                                    <p>
                                                                                        {
                                                                                            data.companyName
                                                                                        }
                                                                                    </p>
                                                                                    <span>
                                                                                        서울·한국
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </OneItem>
                                                                );
                                                            }
                                                        },
                                                    )}
                                            </ul>
                                        </LikeBox>
                                        <WantedPlusBox>
                                            <div className="List_header">
                                                <h2>MY 원티드+</h2>
                                            </div>
                                            <div className="WantedPlus_WantedPlus_container__xwlZK">
                                                <p>
                                                    직군별 최고의 교육을
                                                    한곳에서 볼 수 있는
                                                    원티드+를 이용해보세요
                                                    <br />
                                                    <strong>
                                                        700+개의 영상
                                                    </strong>
                                                    을 언제든 볼 수 있습니다.
                                                </p>

                                                <div className="Referral__button">
                                                    <Link
                                                        to="/wantedplus"
                                                        className="Button__sizeMedium"
                                                    >
                                                        <span>
                                                            원티드+ 알아보기
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </WantedPlusBox>
                                        <MyVidBox>
                                            <div className="List_header">
                                                <h2>MY 영상</h2>
                                            </div>
                                            <div
                                                className="ListEmpty_ListEmpty__3d6Uy"
                                                data-cy="mywanted-myvod"
                                            >
                                                <p>
                                                    이벤트 메뉴에서 영상을
                                                    구매·추가해보세요
                                                </p>
                                                <div className="Referral__button">
                                                    <Link
                                                        className="Button__sizeMedium"
                                                        to="/events"
                                                    >
                                                        <span>
                                                            이벤트 바로가기
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </MyVidBox>
                                        <RecommandBox>
                                            <div className="List_header">
                                                <h2>추천</h2>
                                            </div>
                                            <p className="Referral_Referral__description__dUzRF">
                                                좋은 사람과 좋은 회사가 더 많이
                                                연결되도록 추천하고, 추천받고,
                                                성장하세요
                                            </p>
                                            <div className="Referral__button">
                                                <Link
                                                    className="Button__sizeMedium"
                                                    to="/referral?type=refer"
                                                >
                                                    <span>추천 시작하기</span>
                                                </Link>
                                            </div>
                                        </RecommandBox>
                                    </OptionOuterBox>
                                </RightItemStyle>
                            </RightContentOuterstyle>
                        </OuterBoxStyle>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default MyWanted;

const OneItem = styled.li`
    width: 50%;
    display: inline-block;
    vertical-align: top;
    padding-right: 10px;
    padding-top: 0;
    & img {
        position: absolute;
        width: 100px;
        height: 100px;
        background: #fff 50% / cover no-repeat;
        border: 1px solid #e1e2e3;
        border-radius: 3px;
        overflow: hidden;
    }
`;

const OptionOuterBox = styled.div`
    & .Item_Text {
        padding-left: 120px;
        min-height: 100px;
        color: black;
        & h3 {
            font-size: 18px;
            line-height: 22px;
            font-weight: 500;
            margin-bottom: 8px;
            word-break: break-word;
            overflow: hidden;
            & + div > p {
                font-size: 15px;
                font-weight: 500;
                line-height: 22px;
                margin-bottom: 10px;
                & + span {
                    display: block;
                    font-size: 14px;
                    line-height: 15px;
                    color: #999;
                }
            }
        }
    }
    & .count {
        font-size: 14px;
    }
    & .Referral__button {
        text-align: right;
        height: 40px;
    }
    & .Button__sizeMedium {
        display: inline-flex;
        width: 230px;
        height: 40px;
        font-size: 15px;
        color: #36f;
        background-color: #fff;
        border: 1px solid #36f;
        justify-content: center;
        vertical-align: middle;
        min-width: 64px;
        padding: 0 27px;
        box-sizing: border-box;
        border-radius: 25px;
        align-items: center;
        position: relative;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
    }
    & .List_header {
        display: flex;
        justify-content: space-between;
    }
    & h2 {
        font-size: 18px;
        font-weight: 700;
        line-height: 27px;
    }
    & > div {
        border-top: 1px solid #e1e2e3;
        position: relative;
        padding: 26px 30px 30px;
    }
    & ul {
        padding: 0;
    }
`;

const BookMarkBox = styled.div`
    height: 215px;
`;

const LikeBox = styled.div`
    height: 215px;
`;

const WantedPlusBox = styled.div`
    height: 200px;
`;

const MyVidBox = styled.div`
    height: 200px;
`;

const RecommandBox = styled.div`
    height: 200px;
`;

const ProfileLevelProfileLevel = styled.div`
    & .LevelButtons_button {
        max-width: calc(100% - 60px);
        padding: 2px 24px 0;
        height: 48px;
        margin: 16px auto 0;
        display: block;
        font-size: 16px;
        line-height: 1.1;
        color: #36f;
        background-color: #fff;
        border: 1px solid #36f;
        border-radius: 25px;
    }
    & .LevelButtons_subtitle {
        font-size: 16px;
        font-weight: 400;
        color: #333;
        text-align: center;
        margin: 30px 30px 0;
    }

    & .ProgressBar_profile {
        margin: 0 30px;
        background: rgba(239, 241, 251, 0.44);
        border-radius: 5px;
        padding: 30px 29px 25px 30px;
    }
    & h3 {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        text-align: center;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
    }
    & .ProgressBar_levelWords {
        font-size: 14px;
        color: #666;
        padding: 1.5px 6px 0.5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        vertical-align: middle;
        margin-right: 12px;
    }
    & .ProgressBar_levelText {
        margin: 20px 10px 10px 0;
        background: #ececec;
        border-radius: 5px;
        height: 10px;
        position: relative;
    }
    & progress {
        width: 100%;
        height: 30px;
    }
    & .Level2 {
        width: calc(42.8571% - 2px);
        background-image: linear-gradient(
            90deg,
            #94afff,
            #7b9cff 34%,
            #547fff 100%,
            #334dff 165%,
            #4e5bfd 231%
        );
    }

    & .ProfileLevel_top {
        display: flex;
        margin: 0 30px 30px;
    }
    & .ProfileLevel_title {
        font-size: 18px;
        font-weight: 700;
        height: 28px;
        line-height: 28px;
        color: #333;
        & span {
            background-color: rgb(51, 102, 255);
            width: 16px;
            height: 16px;
            margin: 0 0 3.5px 6px;
            vertical-align: middle;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
        }
    }
`;

const InterestButtonStyle = styled.div`
    // width: 200px;
    padding: 0 22px 0 20px;
    background-color: #f2f4f7;
    border-radius: 19px;
    height: 38px;
    line-height: 38px;
    // margin-top: 20px;
    overflow: hidden;
`;

const StyledDl = styled.dl`
    text-align: center;
    margin-top: 20px;
    & > dt {
        // padding-bottom: 15px;
    }
    & > dd {
        padding-top: 8px;
        font-weight: 200;
        font-size: 14px;
        line-height: 16px;
        color: #767676;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 0;
    }
`;

const ProfileIcon = styled.div`
    display: inline-block;
    position: relative;
    width: 77px;
    height: 77px;
    border-radius: 50%;
    background-size: cover;
    background-position: 50%;
    & > div {
        width: 100%;
        height: 100%;
    }
    & > div > input {
        cursor: pointer;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
`;

const RightItemStyle = styled.div`
    position: relative;
    & .Summary_ulbox {
        position: relative;
        left: -20px;
    }
    & ul {
        list-style: none;
    }
    & .Summary {
        & .firstchild {
            border: 0;
        }
        & a {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-left: 1px solid #e1e2e3;
            color: black;
        }
        & span {
            font-size: 16px;
            line-height: 19px;
            font-weight: 300;
        }
        & em {
            font-weight: 400;
            font-size: 36px;
            line-height: 1;
            padding-bottom: 11px;
            font-style: normal;
        }
        & li {
            float: left;
            width: 25%;
        }
        & .Summary_title {
            font-size: 18px;
            padding: 0 32px 8px;
            font-weight: 700;
        }
    }
    // padding: 26px 30px;
    width: 750px;
    background-color: white;
    background: #fff;
    border: 1px solid #e1e2e3;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const RightContentOuterstyle = styled.div`
    margin-left: 20px;
`;

const ProfileBottomBoxStyle = styled.div`
    padding: 30px 20px;
`;

const ProfileMidBoxStyle = styled.div`
    & span {
        font-size: 16px;
        line-height: 17px;
        font-weight: 500;
    }
    & a {
        width: 202px;
        position: relative;
        display: flex;
        justify-content: space-between;
    }
    & strong {
        position: relative;
        font-size: 18px;
        line-height: 19px;
        font-weight: 700;
    }
    padding: 30px 25px 0px 20px;
    border-bottom: 1px solid #e1e2e3;
    height: 163px;
    & > div > div {
        padding-bottom: 23px;
        height: 42px;
    }
`;

const ProfilePointBoxStyle = styled.div`
    padding: 30px 20px;
    border-bottom: 1px solid #e1e2e3;
    height: 80px;
`;

const ProfileTopBoxStyle = styled.div`
    padding: 42px 20px 20px;
    height: 316px;
    border-bottom: 1px solid #e1e2e3;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileOuterBoxStyle = styled.div`
    & .wantBtn {
        width: 19px;
        height: 19px;
    }
    * button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    & * {
        color: black;
    }
    width: 250px;
    height: 640px;
    background-color: white;
    background: #fff;
    border: 1px solid #e1e2e3;
    border-radius: 5px;
`;

const OuterTitleStyle = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #333;
    padding: 50px 0 20px;
`;

const OuterBoxStyle = styled.div`
    display: flex;
`;
