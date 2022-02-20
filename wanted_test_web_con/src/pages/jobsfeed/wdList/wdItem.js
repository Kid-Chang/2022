import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faShareAlt,
    faHeart,
    faBookmark as fabookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { ServerSignURL } from "../..";
import { useSelector } from "react-redux";
const ResumeItem = ({ name, idx, date, wittenState }) => {
    // 작성중인 이력서는 경고만들어야함.
    return (
        <div>
            <li>
                <ResumeItemText className="editing">
                    <input
                        // style={{ zoom: "2.0" }}
                        type="checkbox"
                        // disabled="disabled"
                        id={idx}
                    />

                    <div>
                        <h4>{name}</h4>
                        <div>
                            <div>한국어</div>
                            <div>{date}</div>
                            <div>{wittenState}</div>
                        </div>
                    </div>
                </ResumeItemText>
            </li>
        </div>
    );
};

const ResumeItemText = styled.div`
    & > div h4 {
        color: #767676;
        font-size: 14px;
        font-weight: 600;
        line-height: 23px;
        letter-spacing: normal;
        text-align: left;
        margin-right: 5px;
    }
    & > div > div {
        font-size: 11px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: normal;
        text-align: left;
        color: #767676;
        display: flex;
        margin-right: 50px;
    }
    & > input {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        margin-left: 20px;
    }
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    border: 1px solid #ececec;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const WdItem = () => {
    const params = useParams();
    const positionIdxx = params.id;
    const [applyNow, setApplyNow] = useState(false);
    const [dataSet, setDataSet] = useState("");
    const [imageArray, setImageArray] = useState([]);
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [WarningBody, setWarningBody] = useState(false);
    const [nowBookmark, setNowBookmark] = useState("");

    const {
        jwt,
        userIdx,
        userName: name,
        email,
        phoneNum,
    } = useSelector((state) => state.LoginReducer);

    const getPosition = async () => {
        const data = await axios.get(
            `${ServerSignURL}/companies/position/${positionIdxx}/${userIdx}`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        setDataSet(data.data.result);
        setImageArray(data.data.result.imageArray);
        setUserName(name);
        setPhoneNumber(phoneNum);
        setNowLike(data.data.result.likeStatus);
        setNowFollow(data.data.result.followingStatus);
        setNowBookmark(data.data.result.bookmarkStatus);

        console.log(data.data.result.bookmarkStatus);
    };

    useEffect(() => getPosition(), []);

    //     title,
    //     companyName,
    //     region,
    //     nation,
    //     recommenderReward,
    //     applicantReward,
    //     content,
    //     deadline,
    //     workingPlace,
    //     industry,
    //     imageArray,
    //     tagArray,
    //     likeList,
    //     likeStatus,
    //     followingStatus,
    //     bookmarkStatus;

    useEffect(() => {
        // console.log(dataSet);
    }, [dataSet]);
    const onApplyClick = () => {
        setApplyNow(!applyNow);
    };

    const slickTrack = useRef();
    const [nowX_carousel, setNowX_carousel] = useState(0);

    useEffect(() => {
        if (dataSet) {
            slickTrack.current.style = `left: ${nowX_carousel}%`;
            // console.log(nowX_carousel);
        }
    }, [nowX_carousel]);

    useEffect(() => console.log(applyNow), [applyNow]);

    const onChange = (e) => {
        console.log(e.target.name);
        const {
            target: { name, value },
        } = e;

        if (name === "name") {
            setUserName(value);
        } else if (name === "phoneNumber") {
            setPhoneNumber(value);
        }
    };
    const [nowLike, setNowLike] = useState(false);

    const onLikeClick = async () => {
        console.log(jwt);
        const ApiData = await axios.post(
            `${ServerSignURL}/users/${userIdx}/likes`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    positionIdx: positionIdxx,
                },
            },
        );
        console.log(ApiData.data.result);
        setNowLike(ApiData.data.result.likeStatus);
    };

    const [nowFollow, setNowFollow] = useState(dataSet.followingStatus);

    useEffect(() => getPosition(), [nowLike, nowFollow, nowBookmark]);

    const onFollowClick = async () => {
        console.log(jwt);
        const ApiData = await axios.post(
            `${ServerSignURL}/users/${userIdx}/follows`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    companyIdx: dataSet.companyIdx, // 값 수정해야함.
                },
            },
        );
        // console.log(ApiData.data.result.likeNum);

        console.log(ApiData.data.result.followingStatus);
        setNowFollow(ApiData.data.result.followingStatus);
        // getData();
    };

    const onChangeClick = async () => {
        // console.log(jwt);
        const data = await axios.post(
            `${ServerSignURL}/users/${userIdx}/bookmarks`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    positionIdx: positionIdxx,
                },
            },
        );
        // console.log("resutl:");
        // console.log(data.data.result);
        setNowBookmark(data.data.result.bookmarkStatus);
    };
    const onRealApplyClick = async () => {
        const sendData = {
            resumeIdxList: [1],
            userName: userName,
            userEmail: email,
            userPhoneNum: phoneNumber,
        };
        console.log(sendData);
        const data = await axios.post(
            `${ServerSignURL}/users/${userIdx}/applications/${positionIdxx}`,
            sendData,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        console.log(data);

        setApplyNow(!applyNow);
    };
    // const [selectResume,setSelectResume] = usesta
    //     const changeResume = () =>{

    //     }

    const [deg, setDeg] = useState(90);
    const onWarningBody = (e) => {
        setWarningBody(!WarningBody);
        // console.log(e);
        // if (deg === 90) {
        //     e.target.style = `transform: rotate(270deg)`;
        //     setDeg(270);
        // } else {
        //     e.target.style = `transform: rotate(90deg)`;
        //     setDeg(90);
        // }
        // console.log(deg);
    };

    //
    //
    //  이력서 조회하는 api 불러오고 저기 선택해서 값 담아보낼 수 있도록 하자.
    const [resumeList, setRseumeList] = useState("");
    const getResume = async () => {
        const ApiData = await axios.get(
            `${ServerSignURL}/users/${userIdx}/resume-list`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        console.log(ApiData.data.result);
        setRseumeList(ApiData.data.result);
    };
    useEffect(() => getResume(), []);
    return (
        <Row className="justify-content-md-center">
            <Col style={{ maxWidth: "1090px" }}>
                {dataSet ? (
                    <OuterBox>
                        <div style={{ marginTop: "20px" }}></div>
                        <div>
                            <JobContentBox>
                                <JobImageBox>
                                    <button
                                        type="button"
                                        className="left"
                                        onClick={() => {
                                            nowX_carousel < 0
                                                ? setNowX_carousel(
                                                      nowX_carousel + 100,
                                                  )
                                                : setNowX_carousel(-300);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                    <button
                                        type="button"
                                        className="right"
                                        onClick={() => {
                                            nowX_carousel > -300
                                                ? setNowX_carousel(
                                                      nowX_carousel - 100,
                                                  )
                                                : setNowX_carousel(0);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </button>
                                    <ImgUl
                                        ref={slickTrack}
                                        style={{ left: " 0%", width: "600%" }}
                                    >
                                        {imageArray.map((url, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        backgroundImage: `url(${url})`,
                                                        backgroundSize: "cover",
                                                    }}
                                                ></div>
                                            );
                                        })}
                                    </ImgUl>
                                </JobImageBox>
                                <JobTextBox>
                                    <JobHeader>
                                        <h2>{dataSet.title}</h2>
                                        <div>
                                            <h6>
                                                <Link
                                                    to={`/company/${dataSet.companyIdx}`}
                                                >
                                                    {dataSet.companyName}
                                                </Link>
                                            </h6>
                                            <div>
                                                <div>
                                                    <button type="button">
                                                        {dataSet.responseLevel ? (
                                                            <ResopnceLevelLabel>
                                                                <span>
                                                                    {
                                                                        dataSet.responseLevel
                                                                    }
                                                                </span>
                                                            </ResopnceLevelLabel>
                                                        ) : null}
                                                    </button>
                                                </div>
                                            </div>
                                            <span>
                                                {dataSet.region}
                                                <span>.</span>
                                                {dataSet.nation}
                                            </span>
                                        </div>

                                        <TagsClass>
                                            <ul>
                                                {dataSet.tagArray.map(
                                                    (tag, index) => {
                                                        return (
                                                            <li key={index}>
                                                                #{tag}
                                                            </li>
                                                        );
                                                    },
                                                )}
                                            </ul>
                                        </TagsClass>
                                    </JobHeader>

                                    <JobDescription>
                                        <section>
                                            <p>
                                                <span>{dataSet.content}</span>
                                            </p>
                                        </section>
                                    </JobDescription>
                                    <div
                                        style={{
                                            border: "1px solid rgb(238,238,238)",
                                        }}
                                    ></div>
                                    <JobWorkPlace>
                                        <div>
                                            <span className="header">
                                                마감일
                                            </span>
                                            <span className="body">
                                                {dataSet.deadline}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="header">
                                                근무지역
                                            </span>
                                            <span className="body">
                                                {dataSet.workingPlace}
                                            </span>
                                            <section className="CompanyInfo">
                                                <Link
                                                    className="company_click"
                                                    to={`/company/${dataSet.companyIdx}`}
                                                >
                                                    <div
                                                        className="logo"
                                                        style={{
                                                            backgroundImage: `url("${dataSet.logo}")`,
                                                            backgroundSize:
                                                                "cover",
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h5>
                                                            {
                                                                dataSet.companyName
                                                            }
                                                        </h5>
                                                        <h6>
                                                            {dataSet.industry}
                                                        </h6>
                                                    </div>
                                                </Link>
                                                {nowFollow === "true" ? (
                                                    <button
                                                        className="FollowButton"
                                                        onClick={() =>
                                                            onFollowClick()
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                "#f2f4f7",
                                                            color: "#ccc",
                                                            border: "0",
                                                        }}
                                                    >
                                                        <div>팔로잉</div>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="FollowButton"
                                                        onClick={() =>
                                                            onFollowClick()
                                                        }
                                                    >
                                                        <div>팔로우</div>
                                                    </button>
                                                )}
                                            </section>
                                            <WarningSection>
                                                <div className="Warning">
                                                    <div className="WarningHeader">
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <g
                                                                fill="currentColor"
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
                                                        <div className="WarningHeaderText">
                                                            <h5 className="WarningHeaderText">
                                                                본 채용정보는
                                                                원티드랩의
                                                                동의없이
                                                                무단전재,
                                                                재배포, 재가공할
                                                                수&nbsp; 없으며,
                                                                구직활동
                                                                이외의&nbsp;
                                                                <br className="break-lg" />
                                                                용도로 사용할 수
                                                                없습니다.
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="btn-open"
                                                                onClick={(e) =>
                                                                    onWarningBody(
                                                                        e,
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faChevronDown
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Warning"></div>
                                                {WarningBody ? (
                                                    <div className="WarningBody">
                                                        <p className="WarningBodyText">
                                                            본 채용 정보는&nbsp;
                                                            <strong>
                                                                {
                                                                    dataSet.companyName
                                                                }
                                                            </strong>
                                                            에서 제공한 자료를
                                                            바탕으로
                                                            원티드랩에서 표현을
                                                            수정하고 이의 배열
                                                            및 구성을 편집하여
                                                            완성한 원티드랩의
                                                            저작자산이자
                                                            영업자산입니다. 본
                                                            정보 및
                                                            데이터베이스의 일부
                                                            내지는 전부에 대하여
                                                            원티드랩의 동의 없이
                                                            무단전재 또는
                                                            재배포, 재가공 및
                                                            크롤링할 수 없으며,
                                                            게재된 채용기업의
                                                            정보는 구직자의
                                                            구직활동 이외의
                                                            용도로 사용될 수
                                                            없습니다. 원티드랩은
                                                            <strong>
                                                                {
                                                                    dataSet.companyName
                                                                }
                                                            </strong>
                                                            에서 게재한 자료에
                                                            대한 오류나 그 밖에
                                                            원티드랩이 가공하지
                                                            않은 정보의 내용상
                                                            문제에 대하여 어떠한
                                                            보장도 하지 않으며,
                                                            사용자가 이를
                                                            신뢰하여 취한 조치에
                                                            대해 책임을 지지
                                                            않습니다.&nbsp;
                                                            <strong>
                                                                &lt;저작권자
                                                                (주)원티드랩.
                                                                무단전재-재배포금지&gt;
                                                            </strong>
                                                        </p>
                                                    </div>
                                                ) : null}
                                            </WarningSection>
                                        </div>
                                    </JobWorkPlace>
                                </JobTextBox>
                            </JobContentBox>
                            {applyNow ? (
                                <>
                                    <JobApplyProcessBox>
                                        <div>지원하기</div>
                                        <ExitButton
                                            onClick={() => onApplyClick()}
                                        >
                                            뒤로
                                        </ExitButton>
                                        <div>
                                            <ApplyScrollOuterBox>
                                                <ApllyScrollBox>
                                                    <div>
                                                        <LeftBlueDiv>
                                                            지원정보
                                                            {/* 이름이랑 연락처 수정가능. */}
                                                        </LeftBlueDiv>
                                                        <ApplyUserInputBox>
                                                            <div className="information">
                                                                <label for="name">
                                                                    <h4>
                                                                        이름
                                                                    </h4>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={
                                                                            userName
                                                                        }
                                                                        onChange={
                                                                            onChange
                                                                        }
                                                                    />
                                                                </label>
                                                                <label for="email">
                                                                    <h4>
                                                                        이메일
                                                                    </h4>
                                                                    <input
                                                                        disabled=""
                                                                        type="text"
                                                                        name="email"
                                                                        value={
                                                                            email
                                                                        }
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <div>
                                                                        <h4>
                                                                            연락처
                                                                        </h4>
                                                                        <input
                                                                            type="text"
                                                                            name="phoneNumber"
                                                                            value={
                                                                                phoneNumber
                                                                            }
                                                                            onChange={
                                                                                onChange
                                                                            }
                                                                        />
                                                                        {/* <button type="button">
                                                                        +821085342690
                                                                    </button> */}
                                                                        {/* 이 친구 일단 인풋으로 처리 */}
                                                                    </div>
                                                                </label>
                                                                <label>
                                                                    <div>
                                                                        <h4>
                                                                            추천인
                                                                        </h4>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </ApplyUserInputBox>
                                                    </div>
                                                    <LeftBlueDiv
                                                        style={{
                                                            marginTop: "25px",
                                                        }}
                                                    >
                                                        첨부파일
                                                    </LeftBlueDiv>
                                                    <ul className="ResumeItem_container">
                                                        {resumeList &&
                                                            resumeList.map(
                                                                (
                                                                    {
                                                                        resumeIdx,
                                                                        updatedAt,
                                                                        isWriting,
                                                                        resumeName,
                                                                    },
                                                                    key,
                                                                ) => {
                                                                    return (
                                                                        <ResumeItem
                                                                            // onChange={
                                                                            //     changeResume
                                                                            // }
                                                                            date={
                                                                                updatedAt
                                                                            }
                                                                            idx={
                                                                                resumeIdx
                                                                            }
                                                                            name={
                                                                                resumeName
                                                                            }
                                                                            key={
                                                                                key
                                                                            }
                                                                            wittenState={
                                                                                isWriting
                                                                            }
                                                                        />
                                                                    );
                                                                },
                                                            )}
                                                        {/* <ResumeItem /> */}
                                                    </ul>
                                                    <GoButton
                                                        style={{
                                                            backgroundColor:
                                                                "white",
                                                            border: "1px solid #e1e2e3",
                                                            color: "#e1e2e3",
                                                        }}
                                                        // onClick={() => onApplyClick()}
                                                    >
                                                        파일 업로드
                                                    </GoButton>
                                                    <GoButton
                                                        style={{
                                                            backgroundColor:
                                                                "white",
                                                            border: "1px solid #e1e2e3",
                                                            color: "#e1e2e3",
                                                        }}
                                                    >
                                                        새 이력서 작성
                                                    </GoButton>
                                                    <div
                                                        style={{
                                                            fontSize: "13px",
                                                            color: "#e1e2e3",
                                                        }}
                                                    >
                                                        원티드 이력서로 지원하면
                                                        최종 합격률이 40%
                                                        높아집니다.
                                                    </div>
                                                </ApllyScrollBox>
                                            </ApplyScrollOuterBox>
                                        </div>
                                        <div
                                            style={{
                                                borderTop: "1px solid #e1e2e3",
                                            }}
                                        >
                                            <GoButton
                                                style={{
                                                    width: "90%",
                                                    margin: "24px 20px",
                                                }}
                                                onClick={() =>
                                                    onRealApplyClick()
                                                }
                                            >
                                                제출하기
                                            </GoButton>
                                        </div>
                                    </JobApplyProcessBox>
                                </>
                            ) : (
                                <>
                                    <JobProcessBox>
                                        <button className="shareButton">
                                            <FontAwesomeIcon
                                                icon={faShareAlt}
                                            />
                                        </button>
                                        <div className="Reward_container">
                                            <h3>채용보상금</h3>
                                            <ul>
                                                <li className="lili">
                                                    <h4>추천인</h4>

                                                    <p>
                                                        {dataSet.recommenderReward.toLocaleString()}
                                                        원
                                                    </p>
                                                </li>
                                                <li className="lili">
                                                    <h4>지원자</h4>
                                                    <p>
                                                        {dataSet.applicantReward.toLocaleString()}
                                                        원
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>

                                        {nowBookmark === "true" ? (
                                            <>
                                                <GoButton
                                                    onClick={() =>
                                                        onChangeClick()
                                                    }
                                                    style={{
                                                        color: "#36f",
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #36f",
                                                    }}
                                                >
                                                    {/* {console.log(nowBookmark)} */}
                                                    <FontAwesomeIcon
                                                        style={{
                                                            color: "rgb(51, 102, 255)",
                                                        }}
                                                        icon={fabookmarkSolid}
                                                    />
                                                    &nbsp;&nbsp;북마크 완료
                                                </GoButton>
                                            </>
                                        ) : (
                                            <>
                                                <GoButton
                                                    onClick={() =>
                                                        onChangeClick()
                                                    }
                                                    style={{
                                                        color: "#36f",
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #36f",
                                                    }}
                                                >
                                                    {/* {console.log(nowBookmark)} */}
                                                    <FontAwesomeIcon
                                                        style={{
                                                            color: "rgb(51, 102, 255)",
                                                        }}
                                                        icon={faBookmark}
                                                    />
                                                    &nbsp;&nbsp;북마크 하기
                                                </GoButton>
                                            </>
                                        )}

                                        <GoButton
                                            onClick={() => onApplyClick()}
                                        >
                                            지원하기
                                        </GoButton>
                                        <LikeBox>
                                            <HeartButton
                                                onClick={() => onLikeClick()}
                                            >
                                                {nowLike === "true" ? (
                                                    <>
                                                        {/* {console.log(nowLike)} */}
                                                        <FontAwesomeIcon
                                                            style={{
                                                                color: "#ff415c",
                                                                paddingRight:
                                                                    "7px",
                                                            }}
                                                            icon={faHeart}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon
                                                            style={{
                                                                color: "#dbdbdb",
                                                                paddingRight:
                                                                    "7px",
                                                            }}
                                                            icon={faHeart}
                                                        />
                                                    </>
                                                )}
                                                {dataSet.likeList.count}{" "}
                                            </HeartButton>
                                            <LikePeopleBox>
                                                {dataSet.likeList.users.map(
                                                    (user, index) => {
                                                        return (
                                                            <img
                                                                src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                                                alt=""
                                                                key={index}
                                                            />
                                                        );
                                                    },
                                                )}
                                            </LikePeopleBox>
                                        </LikeBox>
                                    </JobProcessBox>
                                    <WantedAiContainer>
                                        <div>wanted Ai 합격예측</div>
                                        <div>서류합격률이 궁금하다면?</div>
                                    </WantedAiContainer>
                                </>
                            )}
                        </div>
                    </OuterBox>
                ) : null}
            </Col>
        </Row>
    );
};

export default WdItem;

const WarningSection = styled.section`
    background-color: #f3f5f8;
    & .Warning {
        margin-top: 10px;
        border-radius: 5px;
    }
    & .WarningHeader {
        padding: 18px 30px;
        display: flex;
        align-items: center;
    }
    & .WarningHeaderText {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    & h5 {
        margin: 0 20px;
        font-size: 12px;
        font-weight: 700;
        line-height: 22px;
        color: #333;
    }
    & button {
        size: 14px;
        transform: rotate(0deg);
    }
    & .WarningBody {
        padding: 13px 30px 30px;
        border-top: 1px solid #ececec;
    }
    & .WarningBodyText {
        font-size: 13px;
        line-height: 24px;
        color: #666;
    }
`;

const LikeBox = styled.div`
    display: flex;
    position: relative;
`;

const LikePeopleBox = styled.div`
    top: 10px;
    left: 20px;
    position: relative;

    & img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid #fff;
        float: left;
        position: relative;
        margin-left: -10px;
        z-index: 1;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }
`;

const HeartButton = styled.div`
    margin-top: 10px;
    color: black;
    z-index: 100;
    width: 60px;
    height: 30px;
    border-radius: 15px;

    font-size: 14px;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    border: 1px solid #e1e2e3;
    // margin-right: 12px;
    & svg {
        font-size: 24px;
    }
`;

const WantedAiContainer = styled.div`
    position: fixed;
    right: calc((100% - 1060px) / 2);
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    top: 365px;
    width: 340px;
    height: 40px;
    border-radius: 5px;
    background-color: #f3f5f8;
    padding: 11px 15px 10px;
    & div:nth-child(2) {
        color: #999;
    }
`;

const ApplyUserInputBox = styled.div`
    & > button {
        float: left;
        width: calc(100% - 80px);
        height: 50px;
        padding: 0;
        border: none;
        border-bottom: 1px solid #e1e2e3;
        font-size: 16px;
        font-weight: 600;
        line-height: 50px;
        color: #2886fa;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    & h4 {
        line-height: 50px;
        font-size: 16px;
        font-weight: 600;
        float: left;
        width: 80px;
    }
    & input {
        width: calc(100% - 80px);
        height: 50px;
        padding: 0;
        border: none;
        border-bottom: 1px solid #e1e2e3;
    }

    & label {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e1e2e3;
        margin-bottom: 5px;
    }
`;

const LeftBlueDiv = styled.div`
    border-left: 2px solid #258bf7;
    padding-left: 20px;
    margin: 0 -20px;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
`;

const ApllyScrollBox = styled.div`
    padding: 20px 20px 0;
    & > .ResumeItem_container {
        margin-bottom: 30px;
    }
`;

const ApplyScrollOuterBox = styled.div`
    height: 400px;
    overflow-y: scroll;
`;

const ExitButton = styled.div`
    color: rgb(153, 153, 153);
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;

    padding: 15px;
`;

const GoButton = styled.button`
    margin-bottom: 10px;
    border: 0px;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    background-color: #36f;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: normal;
    text-align: center;
    padding: auto 0;
`;

const JobProcessBox = styled.div`
    top: 70px;
    width: 340px;
    position: fixed;
    right: calc((100% - 1060px) / 2);
    border: 1px solid #e1e2e3;
    background-color: #fff;
    padding: 24px 20px;
    border-radius: 3px;
    & h3 {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: normal;
        text-align: left;
        color: #333;
    }
    & ul {
        padding-left: 0px;
    }
    & .lili {
        float: left;
        width: 50%;
        letter-spacing: normal;
        text-align: left;

        & > h4 {
            font-size: 14px;
            font-weight: 600;
            color: #999;
            margin-bottom: 8px;
            line-height: 1.2;
        }
    }
    & .shareButton {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 20px;
        color: #36f;
        border: 1px solid #e1e2e3;
    }
`;

const JobApplyProcessBox = styled(JobProcessBox)`
    & > div:nth-child(1) {
        padding-top: 15px;
        display: flex;
        justify-content: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #e1e2e3;
    }
    padding: 0px;
`;

const JobWorkPlace = styled.div`
    & span {
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
        vertical-align: text-top;
    }
    margin: 20px 0 40px;
    & > div {
        margin-bottom: 20px;
    }
    & .header {
        color: #999;
        width: 80px;
    }
    & .body {
        color: #333;
        width: calc(100% - 80px);
    }
    & .CompanyInfo {
        border-radius: 3px;
        border: 1px solid #e1e2e3;
        padding: 20px;
        align-items: center;
        background: #fff;
        justify-content: space-between;
        margin: 80px 0 0;
        display: flex;
    }
    & .FollowButton {
        border: 1px solid #e1e2e3;
        height: 40px;
        font-size: 15px;
        color: #36f;
        background-color: #fff;
        justify-content: center;
        vertical-align: middle;
        min-width: 64px;
        padding: 0 27px;
        box-sizing: border-box;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
    }
    & .company_click {
        display: flex;
        font-size: 15px;
        text-align: left;
    }
    & .company_click h5 {
        color: #333;
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 5px;
        word-break: break-word;
        overflow: hidden;
        padding-right: 10px;
    }
    & .company_click h6 {
        color: #999;
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        padding-right: 10px;
    }
    & .logo {
        background-position: 50%;
        background-size: cover;
        width: 50px;
        height: 50px;
        box-shadow: 0 0 1px 0 rgb(0 0 0 / 10%);
        margin-right: 15px;
    }
`;

const JobDescription = styled.div`
    margin: 40px 0 80px;
    color: #333;
    & h6 {
        margin: 20 px 0 0;
        font-weight: 600;
    }
    white-space: pre-line;
`;

const TagsClass = styled.div`
    margin-top: 20px;
    & > ul {
        padding-left: 0;
    }
    & li {
        list-style: none;
        display: inline-block;
        margin-right: 6px;
        margin-bottom: 10px;
        padding: 9px 14px;
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        color: #333;
        background-color: #f3f5f8;
        border-radius: 25px;
        // padding-left: 0;
    }
`;

const ResopnceLevelLabel = styled.div`
    border-radius: 2px;
    background-color: #fff;
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    height: 19px;
    line-height: 19px;
    margin-top: 4px;
    padding: 0 5px;
    border: 1px solid #00aead;
    color: #00aead;
`;

const JobHeader = styled.div`
    margin: 40px 0 30px;
    & > h2 {
        color: #333;
        font-size: 22px;
        font-weight: 600;
        margin: 0 0 10px;
        word-break: keep-all;
        word-wrap: break-word;
    }
    & h6 {
        max-width: calc(100% - 68px);
    }
    & > div {
        display: flex;

        & > div,
        > span {
            margin-left: 10px;
        }
    }
`;

const JobTextBox = styled.div`
    & nth-child(1) {
    }
`;

const JobContentBox = styled.div`
    display: block;
    width: calc(100% - 360px);
    vertical-align: top;
    & button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    & a {
        color: black;
    }
`;

const JobImageBox = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    border: 1px solid #e1e2e3;
    & button {
        width: 9%;
        height: 100%;
        opacity: 0.7;
        z-index: 1;
        position: absolute;
        font-size: 26px;
        color: #b5b5b5;
    }
    & .left {
        left: 0px;
    }
    & .right {
        right: 0px;
    }
`;

const ImgUl = styled.ul`
    left: 0%;
    width: 600%;
    padding: 0;
    position: relative;
    margin: 0;
    transition: left 0.5s;
    & > div {
        padding-bottom: 11.6667%;
        width: 16.6667%;

        ackground-position: 50%;
        background-repeat: no-repeat;
        background-color: #fbfbfb;
        background-size: cover;
        float: left;
    }
`;

const OuterBox = styled.div`
    position: relative;
    list-style: none;
    & ul {
        list-style: none;
    }
    & > div {
        display: flex;
    }
`;
