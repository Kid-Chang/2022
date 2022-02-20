import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";

const ApplicationStatusPage = () => {
    const { userIdx, jwt } = useSelector((state) => state.LoginReducer);
    const [applicationsList, setApplicationsList] = useState([]);
    const [applicationsPapers, setApplicationsPapers] = useState([]);

    const getData = async () => {
        const applicationsData = await axios.get(
            `${ServerSignURL}/users/${userIdx}/applications`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        console.log(applicationsData.data.result);
        console.log(applicationsData.data.result.applicationList);
        setApplicationsList(applicationsData.data.result);
        setApplicationsPapers(applicationsData.data.result.applicationList);
    };
    useEffect(() => getData(), []);
    return (
        <Background>
            <div>
                <Row className="justify-content-md-center">
                    <Col style={{ maxWidth: "1090px" }}>
                        <Header>지원 현황</Header>
                        <MidBox>
                            <LeftBox>
                                <dl>
                                    <dt>추천한 후보자</dt>
                                    <dd>
                                        <ul>
                                            <li className="">
                                                <div>추천보상금 대상자</div>
                                            </li>
                                        </ul>
                                    </dd>
                                </dl>
                                <dl
                                    style={{
                                        marginTop: "30px",
                                        borderTop: "1px solid #e1e2e3",
                                        paddingTop: "30px",
                                    }}
                                >
                                    <dt>지원</dt>
                                    <dd>
                                        <ul>
                                            <li className="">
                                                <div>작성 중</div>
                                                <div className="label_">0</div>
                                            </li>
                                            <li className="active">
                                                <div>지원한 포지션</div>
                                            </li>
                                        </ul>
                                    </dd>
                                </dl>
                            </LeftBox>

                            <Summary>
                                <div className="Summary_ulbox">
                                    <ul
                                        className="Summary_status"
                                        data-cy="mywanted-summary"
                                    >
                                        <li>
                                            <div
                                                className="total"
                                                style={{ borderLeft: "0" }}
                                            >
                                                <em className="">
                                                    {applicationsList.totalNum}
                                                </em>
                                                <span>전체</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="applyDone">
                                                <em className="">
                                                    {
                                                        applicationsList.registerNum
                                                    }
                                                </em>
                                                <span>지원 완료</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="pass">
                                                <em className="">
                                                    {applicationsList.passNum}
                                                </em>
                                                <span>서류 통과</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hire">
                                                <em className="">
                                                    {
                                                        applicationsList.finalPassNum
                                                    }
                                                </em>
                                                <span>최종 합격</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="rejected">
                                                <em className="">
                                                    {applicationsList.failNum}
                                                </em>
                                                <span>불합격</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <MidUnderBox>
                                    <div className="Search_List">
                                        <p>총 {applicationsList.totalNum}건</p>
                                        <div>
                                            <i
                                                className="icon-search"
                                                style={{
                                                    color: "rgb(80, 80, 80)",
                                                }}
                                            ></i>
                                            <input
                                                type="text"
                                                placeholder="회사 / 지원자명 검색"
                                                value=""
                                            />
                                        </div>
                                    </div>
                                    <ListTable>
                                        <div className="table-header">
                                            <span className="company_name">
                                                지원 회사
                                            </span>
                                            <span className="position">
                                                지원 포지션
                                            </span>
                                            <span className="create_time">
                                                작성시간
                                            </span>
                                            <span className="status">
                                                진행상태
                                            </span>
                                            <span className="recommandation">
                                                추천 현황
                                            </span>
                                            <span className="reward">
                                                보상금 신청
                                            </span>
                                        </div>
                                        {applicationsPapers &&
                                            applicationsPapers.map(
                                                (data, index) => {
                                                    return (
                                                        <ApplicationState
                                                            key={index}
                                                        >
                                                            <span className="company_name">
                                                                {
                                                                    data.companyName
                                                                }
                                                            </span>
                                                            <span className="position">
                                                                {
                                                                    data.positionName
                                                                }
                                                            </span>
                                                            <span className="create_time">
                                                                {data.updatedAt}
                                                            </span>
                                                            <span className="status">
                                                                {data.progress}
                                                            </span>
                                                            <span className="recommandation">
                                                                추천 현황
                                                            </span>
                                                            <span className="reward">
                                                                보상금 신청
                                                            </span>
                                                        </ApplicationState>
                                                    );
                                                },
                                            )}
                                        {/* applicationIdx: 1
companyName: "씨제이올리브영(CJ올리브영)"
isRewarded: "false"
positionName: "데이터 사이언티스트 (Data Scientist)"
progress: "접수"
updatedAt: "2022.01.19"
userName: "김예준" */}
                                    </ListTable>
                                </MidUnderBox>
                            </Summary>
                        </MidBox>
                    </Col>
                </Row>
            </div>
        </Background>
    );
};

const ApplicationState = styled.div`
    display: flex;
    background-color: white;
    height: 50px;
    align-items: center;
    & span {
        font-size: 14px !important;
        text-align: center;
    }
`;

const ListTable = styled.div`
    margin-bottom: 60px;

    & .table-header {
        background-color: #f8f8fa;
        border-bottom: 1px solid rgba(209, 209, 209, 0.4);
        display: flex;
        & span {
            text-align: center;
            color: #86939e;
            font-size: 12px;
            font-weight: 500;
            min-height: 44px;
            text-align: center;
            line-height: 44px;
            box-sizing: border-box;
            word-break: break-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    & .company_name {
        text-align: left;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-flex-basis: calc(21% + 34px);
        -ms-flex-preferred-size: calc(21% + 34px);
        flex-basis: calc(21% + 34px);
    }
    & .position {
        flex: 1 0 20%;
    }
    & .create_time {
        flex: 1 0 13%;
    }
    & .status {
        flex: 1 0 12%;
    }
    & .recommandation {
        flex: 1 0 12%;
    }
    & .reward {
        flex: 1 0 12%;
    }
`;

const MidUnderBox = styled.div`
    & input {
        font-size: 16px;
        border: none;
        color: #333;
        padding: 0;
        width: 160px;
        min-height: 30px;
        background: none;
    }
    position: relative;
    top: 60px;
    & .Search_List {
        height: 80px;
        margin: 20px 0 40px;
        & > p {
            float: left;
            font-size: 16px;
            color: #3b3d40;
            margin: 0;
            font-weight: 400;
        }
        & > div {
            float: right;
        }
    }
`;

const Header = styled.p`
    font-size: 20px;
    font-weight: 700;
    color: #333;
    padding: 50px 0 20px;
`;

const MidBox = styled.div`
    width: 100%;
    display: flex;
`;

const LeftBox = styled.div`
    width: 25.4717%;
    margin-bottom: 0;
    padding-right: 20px;
    height: 250px;
    & dl {
        margin: 0;
        padding: 12px 0;
        border-bottom: 1px solid #e1e2e3;
        border: none;
        margin: 0;
        padding: 8px 0;
        font-size: 14px;
        font-weight: 500;
        color: #86939e;
        & dt {
            margin-bottom: 15px;
        }
        & .label_ {
            margin-left: auto;
            font-size: 12px;
            padding: 2px 10px;
            height: 21px;
            min-width: 30px;
            height: 30px;
            border-radius: 3px;
            background-color: #e1e2e3;
            color: #333;
            font-weight: 400;
        }
    }
    & li {
        margin: 12px 0;
        font-size: 16px;
        font-weight: 300;
        display: flex;
    }
`;

const Background = styled.div`
    position: absolute;
    width: 100%;
    z-index: 300;
    background-color: rgb(248, 248, 248);
    min-height: 100%;
    & dl {
        margin: 0;
        padding: 0;
        border: 0;
    }
    & ul {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 0;
    }
`;
const Summary = styled.div`
    width: 100%;
    & ul {
        list-style: none;
        width: 100%;
    }
    & .firstchild {
        border: 0;
    }
    & li > div {
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
        font-weight: 100;
        font-size: 40px;
        line-height: 1;
        padding-bottom: 11px;
        font-style: normal;
    }
    & li {
        float: left;
        width: 20%;
    }
    & .Summary_title {
        font-size: 18px;
        padding: 0 32px 8px;
        font-weight: 700;
    }
`;

export default ApplicationStatusPage;
