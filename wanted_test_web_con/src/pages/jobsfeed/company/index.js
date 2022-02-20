import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { ServerSignURL } from "../..";
import { useSelector } from "react-redux";
import { faBookmark as fabookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const JobItem = ({ data }) => {
    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);

    const [bookmark, setBookmark] = useState(data.bookmarkStatus);
    const onBookmarkClick = async () => {
        const apiData = await axios.post(
            `${ServerSignURL}/users/${userIdx}/bookmarks`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    positionIdx: data.positionIdx,
                },
            },
        );
        // console.log(apiData.data.result);
        setBookmark(apiData.data.result.bookmarkStatus);
    };

    // console.log(data);
    //     bookmarkStatus: "false"
    // deadline: "2022-03-28"
    // reward: 1000000
    // title: "데이터 사이언티스트 (Data Scientist)"
    return (
        // positionIdx
        <>
            {data ? (
                <JobItemBox>
                    <Link to={`/wd/${data.positionIdx}`}>
                        <h4>{data.title}</h4>
                        <h5>채용보상금 {data.reward.toLocaleString()}원</h5>
                        <p>{data.deadline}</p>
                    </Link>
                    {bookmark === "true" ? (
                        <button
                            className="JobItem_bookmarkBtn"
                            onClick={() => onBookmarkClick()}
                        >
                            <FontAwesomeIcon icon={fabookmarkSolid} />
                        </button>
                    ) : (
                        <button
                            className="JobItem_bookmarkBtn"
                            onClick={() => onBookmarkClick()}
                        >
                            <FontAwesomeIcon icon={faBookmark} />
                        </button>
                    )}
                </JobItemBox>
            ) : null}
        </>
    );
};

const CompanyItem = () => {
    const params = useParams();
    const companyIdxx = params.id;
    // console.log(companyIdxx);

    const [dataSet, setDataSet] = useState("");
    const [imageArray, setImageArray] = useState([]);

    const {
        jwt,
        userIdx,
        userName: name,
        email,
        phoneNum,
    } = useSelector((state) => state.LoginReducer);

    const getCompany = async () => {
        const data = await axios.get(
            `${ServerSignURL}/companies/${companyIdxx}/${userIdx}`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        setDataSet(data.data.result);
        setImageArray(data.data.result.imageArray);
        console.log(data.data.result);
        setNowFollow(data.data.result.followStatus);
    };
    const [nowFollow, setNowFollow] = useState(dataSet.followingStatus);
    useEffect(() => getCompany(), [nowFollow]);

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
    const [show, setShow] = useState(false);
    const showMoreIntro = () => {};

    return (
        <div>
            <TitleBox>
                <Row className="justify-content-md-center">
                    <Col style={{ maxWidth: "1090px" }}>
                        {dataSet ? (
                            <HeaderBox>
                                <img src={dataSet.logo} alt="" />
                                <h2>{dataSet.name}</h2>
                                {nowFollow === "true" ? (
                                    <button
                                        className="FollowButton"
                                        onClick={() => onFollowClick()}
                                        style={{
                                            backgroundColor: "#f2f4f7",
                                            color: "#ccc",
                                            border: "0",
                                        }}
                                    >
                                        <div>팔로잉</div>
                                    </button>
                                ) : (
                                    <button
                                        className="FollowButton"
                                        onClick={() => onFollowClick()}
                                    >
                                        <div>팔로우</div>
                                    </button>
                                )}
                            </HeaderBox>
                        ) : null}
                    </Col>
                </Row>
            </TitleBox>
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    {dataSet ? (
                        <>
                            <OuterBox>
                                <div>
                                    <TagClassBox>
                                        <h3>태그</h3>
                                        <div>
                                            {dataSet.tagArray.map(
                                                (tag, idx) => {
                                                    return (
                                                        <li key={idx}>{tag}</li>
                                                    );
                                                },
                                            )}
                                            <li className="opinion">
                                                <button
                                                    type="button"
                                                    className="opinionBtn"
                                                >
                                                    + 태그 의견보내기
                                                </button>
                                            </li>
                                        </div>
                                        <div className="item-gradient end"></div>
                                    </TagClassBox>
                                </div>
                                <div>
                                    <CompanyDetailBox>
                                        <JobsBox>
                                            <h3>채용중인 포지션</h3>
                                            <JobListWrapper>
                                                {/* 나중에 Link태그로변경하고, 매핑 필요함. */}
                                                {dataSet.positionList.map(
                                                    (position, idx) => {
                                                        return (
                                                            <JobItem
                                                                key={idx}
                                                                data={position}
                                                            />
                                                        );
                                                    },
                                                )}

                                                {/* 여기까지. */}
                                            </JobListWrapper>
                                            <button className="Jobs_showMoreButton">
                                                더 많은 포지션 보기
                                            </button>
                                            {/* 버튼누르면 더 찾도록 구현. */}
                                        </JobsBox>
                                        <IntroClass>
                                            <h3>회사 소개</h3>
                                            <ImageWrapper>
                                                {dataSet.imageArray.map(
                                                    (src, idx) => {
                                                        return (
                                                            <ImgBtn key={idx}>
                                                                <img
                                                                    src={src}
                                                                    alt=""
                                                                />
                                                            </ImgBtn>
                                                        );
                                                    },
                                                )}
                                            </ImageWrapper>
                                            <Specialp show={show}>
                                                {dataSet.introduce}
                                            </Specialp>
                                            <button
                                                className="Intro_showMoreButton"
                                                type="button"
                                                onClick={() => setShow(!show)}
                                            >
                                                더 보기
                                                <i className="icon-arrow_down"></i>
                                            </button>
                                        </IntroClass>
                                        <NewsClass>
                                            <h3>이 회사의 뉴스</h3>
                                            <div>
                                                {dataSet.newsArray.map(
                                                    (news, idx) => {
                                                        return (
                                                            <JobItemBox
                                                                key={idx}
                                                            >
                                                                <h4>
                                                                    headLine
                                                                </h4>
                                                                <p
                                                                    style={{
                                                                        marginTop:
                                                                            "20px",
                                                                    }}
                                                                >
                                                                    {news}
                                                                </p>
                                                            </JobItemBox>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </NewsClass>
                                    </CompanyDetailBox>
                                </div>
                            </OuterBox>
                        </>
                    ) : null}

                    {/* // */}
                    {/* // */}

                    {/* // */}
                    {/* // */}
                    {/* // */}
                </Col>
            </Row>
        </div>
    );
};
const Specialp = styled.p`
    // max-height: 81px;
    max-height: ${(props) => (props.show ? null : "81px")};
`;

const HeaderBox = styled.div`
    height: 90px;
    width: 100%;
    position: relative;
    max-width: 1060px;
    margin: 0 auto;
    & img{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border: 1px solid #f1f1f2;
    }
    & h2{
        position: absolute;
    left: 65px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    display: inline-block;
    width: calc(100% - 200px);
    font-size: 26px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #333;
}
    }

}
`;

const NewsClass = styled.div`
    margin-bottom: 100px;

    & > h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1;
        color: #333;
        margin-bottom: 20px;
    }
    & > div {
        margin-left: -10px;
    }
`;

const ImgBtn = styled.div`
    float: left;
    width: calc(25% - 10px);
    height: 100%;
    margin-left: 10px;
}
    & img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        // margin-left: 10px;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    margin-left: -10px;
    margin-bottom: 20px;
    height: 124px;
    overflow: hidden;
`;

const IntroClass = styled.div`
    margin-bottom: 70px;
    & > h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1;
        color: #333;
        margin-bottom: 20px;
    }
    & .Intro_showMoreButton {
        font-size: 16px;
        font-weight: 400;
        line-height: 1;
        color: #999;
        padding: 10px 0;
    }
    & button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    & p {
        position: relative;
        font-size: 16px;
        line-height: 27px;
        width: 100%;
        overflow: hidden;
        white-space: pre-line;
    }
`;

const JobItemBox = styled.div`
    overflow: hidden;

    display: block;
    position: relative;
    float: left;
    width: calc(50% - 20px);
    max-height: 108px;
    margin: 0 10px 20px;
    padding: 16px 20px 19px;
    border-radius: 3px;
    border: 1px solid #e1e2e3;
    & h4 {
        width: calc(100% - 40px);
        font-size: 18px;
        line-height: 1.4;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
    }
    & h5 {
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        color: #86939e;
        margin-top: 3px;
    }
    & p {
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
        color: #666;
        margin-top: 15px;
        width: 3000px;
        overflow: hidden;
    }
    & button {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        font-size: 15px;
        font-weight: 400;
        line-height: 1;
        color: rgb(51, 102, 255);
        width: 34px;
        height: 34px;
        border: 1px solid #e1e2e3;
        border-radius: 17px;
        background-color: white;
    }
`;

const JobListWrapper = styled.div`
    margin: 0 -10px;
`;
const JobsBox = styled.div`
    margin-bottom: 80px;

    & h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1;
        color: #333;
        margin-bottom: 20px;
    }

    & .Jobs_showMoreButton {
        width: 100%;
        padding: 16px;
        border-radius: 3px;
        border: 1px solid #e1e2e3;
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        color: #999;
    }
`;
const CompanyDetailBox = styled.div`
    float: right;
    width: calc(70% - 20px);
    min-height: 500px;
    margin-right: 20px;
`;

const OuterBox = styled.div`
    margin-top: 50px;
`;

const TagClassBox = styled.div`
    & h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1;
        color: #333;
        margin-bottom: 20px;
    }
    float: right;
    width: calc(30% - 10px);
    margin-left: 20px;
    margin-right: -10px;
    & a {
        line: none;
        color: black;
    }
    & li {
        background-color: #f3f5f8;
        padding: 12px 16px;
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        line-height: 1;
        color: #333;
        border-radius: 20px;
        margin-right: 6px;
        margin-bottom: 10px;
    }
    & .opinion {
        color: #999;
        border: 1px dashed #ccc;
        padding: 12px 16px;
        background-color: white;
    }
    & .opinionBtn {
        border: 0;
        background-color: white;
        color: #999;
    }
`;

export default CompanyItem;

const TitleBox = styled.div`
    border-bottom: 1px solid #ececec;
    display: flex;
    justify-contenet: center;
    & > div {
        margin: 0 auto;
        width: 1080px;
    }
    & .FollowButton{

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
        position: absolute;
    right: 0;
    top: 25%;
    }

    }
`;

// 이전거.
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
