import styled from "styled-components";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileUpload,
    faEllipsisV,
    faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Resume_list_data } from "./resume_temp_data";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ServerSignURL } from "..";
import { useEffect, useState } from "react";
const { Row, Col } = require("react-bootstrap");

const WriteAndUploadBox = ({ icon, text, bgColor, color }) => {
    return (
        <WAUBoxStyle>
            <div style={{ backgroundColor: `${bgColor}`, color: `${color}` }}>
                {icon}
            </div>
            <div>{text}</div>
        </WAUBoxStyle>
    );
};

const ResumeItem = ({ name, idx, date, wittenState }) => {
    // console.log(wittenState);
    return (
        <ResumeItemStyle>
            <div>
                {/* style={{ color: "#333333" }} */}
                {wittenState ? (
                    <div style={{ color: "#333333" }}>{name}</div>
                ) : (
                    <div>{name}</div>
                )}

                <div>{date}</div>
            </div>
            <div>
                <div>한</div>
                {wittenState === 0 ? (
                    <div>작성 중</div>
                ) : (
                    <div style={{ color: "#333333" }}>작성 완료</div>
                )}
                <div>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
            </div>
        </ResumeItemStyle>
    );
};

const ResumePage = () => {
    // 구조분해할당.
    const {
        userName: name,
        jwt,
        userIdx,
    } = useSelector((state) => state.LoginReducer);
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

    // 분해할당 안하면
    // userObj으로 부르고 const name = userObj.name; 이런식으로.
    console.log(name);
    return (
        <div style={{ minHeight: "95vh", backgroundColor: "#f8f8f8" }}>
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    <Head>
                        <div>최근문서</div>
                        <IntroLinkStyle to="/cv/intro">
                            {/* <Link to="/cv/intro"> */}
                            원티드 이력서 소개
                            <div>
                                <FontAwesomeIcon icon={faInfo} size="xs" />
                            </div>
                            {/* </Link> */}
                        </IntroLinkStyle>
                    </Head>
                    <Body>
                        <WriteAndUploadBox
                            icon={<FontAwesomeIcon icon={faFile} />}
                            text="새 이력서 작성"
                            bgColor={"#36f"}
                            color={"#fff"}
                        />
                        <WriteAndUploadBox
                            icon={<FontAwesomeIcon icon={faFileUpload} />}
                            text="파일 업로드"
                            bgColor={"#e1e2e3"}
                            color={"#666"}
                        />

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
                                            date={updatedAt}
                                            idx={resumeIdx}
                                            name={resumeName}
                                            key={key}
                                            wittenState={isWriting}
                                        />
                                    );
                                },
                            )}
                    </Body>
                </Col>
            </Row>
        </div>
    );
};

export default ResumePage;

const BoxOriginalStyle = styled.div`
    border: 1px solid #dbdbdb;
    height: 190px;
    // width: calc(25% - 20px);
    margin-bottom: 20px;
    margin-right: 20px;
    background-color: white;
`;

const ResumeItemStyle = styled(BoxOriginalStyle)`
    position: relative;
    color: #999999;
    & > div:nth-child(1) {
        padding: 20px;
        font-size: 16px;
        font-weight: 500;
        & div:nth-child(1) {
            font-size: 18px;
            font-weight: 600;
        }
    }

    & > div:nth-child(2) {
        border-top: 1px solid #e0e0e0;
        display: flex;
        position: absolute;
        align-items: center;
        bottom: 0;
        width: 100%;
        height: 50px;
        padding: 0 18px 0 20px;
        font-size: 16px;
        font-weight: 600;

        & > div:nth-child(1) {
            width: 20px;
            height: 20px;
            border-radius: 2px;
            border: 1px solid #333;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            font-weight: 600;
            margin-right: 10px;
        }
        & > div:nth-child(2) {
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: normal;
            text-align: left;
        }
        & > div:nth-child(3) {
            display: flex;
            align-items: center;
            margin-left: auto;
            font-size: 20px;
            color: #76797e;
            height: 100%;
            width: 20 px;
        }
    }
`;

const WAUBoxStyle = styled(BoxOriginalStyle)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div:nth-child(1) {
        cursor: pointer;
        width: 74px;
        height: 74px;
        margin: 0 auto;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    & > div:nth-child(2) {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: normal;
        text-align: center;
        color: #333;
        margin: 20px 0 0;
    }
`;
const Body = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    position: relative;
`;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 25px 5px 10px;
    height: 52px;
    align-items: center;
    & > div:nth-child(1) {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.4;
    }

    & div:nth-child(2) {
    }
`;

const IntroLinkStyle = styled(Link)`
    display: flex;
    font-size: 16px;
    align-items: center;
    color: #36f;
    & > div {
        text-align: center;
        font-size: 11px;
        margin-left: 5px;
        border: 1px solid #36f;
        width: 16px;
        height: 16px;
        border-radius: 50%;
    }
`;
