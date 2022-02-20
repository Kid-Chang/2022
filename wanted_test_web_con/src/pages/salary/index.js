import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";
import Chart from "./chart";
import ItemLayout from "./itemLayout";

const SalaryPage = () => {
    const [positionList, setPositionList] = useState([]);

    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);

    const refreshItem = async (propLimitCount) => {
        const URL = `${ServerSignURL}/companies/positions-list/${userIdx}`;
        // console.log(URL);
        const data = await axios.get(URL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: {
                limit: `22`,
            },
        });

        let Items = data.data.result;
        const sortItem = Items.sort(function (a, b) {
            return b.positionIdx - a.positionIdx;
        });
        sortItem.splice(8, 23);

        setPositionList(sortItem);
    };

    const getMoreItem = async () => {
        // console.log(limitCount);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const URL = `${ServerSignURL}/companies/positions-list/${userIdx}`;
        // console.log(URL);
        const data = await axios.get(URL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: {
                limit: `22`,
            },
        });

        let Items = data.data.result;
        const sortItem = Items.sort(function (a, b) {
            return b.positionIdx - a.positionIdx;
        });
        sortItem.splice(8, 23);
        setPositionList(sortItem);
        console.log(sortItem);
        // console.log(limitCount);
    };

    useEffect(() => getMoreItem(), []);

    return (
        <div
            style={{
                backgroundColor: "rgb(248,248,248)",
                // height: "100vh",
                position: "relative",
                width: "100vw",
            }}
        >
            <div>
                <SalaryHead>
                    <Row className="justify-content-md-center">
                        <Col style={{ maxWidth: "1090px" }}>
                            <div className="outer">
                                <section>
                                    <Chart />
                                </section>
                                <div className="ButtonGroup">
                                    <button
                                        type="button"
                                        className="style_wrapper"
                                    >
                                        개발
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </SalaryHead>
            </div>
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    <div>
                        <MatchupBanner>
                            <div className="MatchupBanner_MatchupBanner_title__UgL50">
                                이제 밤새워 채용사이트 보지 마세요.
                            </div>
                            <div className="MatchupBanner_MatchupBanner_desc__cTAqB">
                                원티드 매치업에 프로필을 등록하면, 기업의
                                인사담당자가 직접 면접을 제안합니다.
                            </div>

                            <div
                                style={{
                                    position: "relative",
                                    paddingLeft: "-20px",
                                }}
                            >
                                <ul className="companyListContainer">
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.c52b0714.jpeg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.9ebf8983.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.1ce2c52b.png)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5_35b131c9-5b04-4248-a0bd-1f39240406df.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.18dfe4ff.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5_465f0a8c-3b5b-4004-be0b-13f3c1c08200.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.a6ddfb4a.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.a10206f5.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.8f75d757.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.7a05ba42.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.cc9b552a.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.f196b9b9.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.6060f08d.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.e810f1c7.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                    <li
                                        style={{
                                            backgroundImage:
                                                "url(https://static.wanted.co.kr/images/wdes/0_5.985b9922.jpg)",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}
                                    ></li>
                                </ul>
                                <div className="lastItem">+7377</div>
                            </div>
                            <Link to="/profile/matching">시작하기</Link>
                        </MatchupBanner>
                        <TitleWrapper>
                            <h2 className="List_title">
                                연봉 업그레이드 포지션
                            </h2>
                            <Link to="/wdlist/518/873">더 보기</Link>
                        </TitleWrapper>
                        <ContainerOuterBox>
                            {positionList.map((position, index) => {
                                return (
                                    <ItemLayout
                                        key={index}
                                        positionIdx={position.positionIdx}
                                        imgUrl={position.image}
                                        title={position.title}
                                        companyName={position.companyName}
                                        region={position.region}
                                        nation={position.nation}
                                        reward={position.reward}
                                        responceLevel={position.responseLevel}
                                        likeNum={position.likeNum}
                                        likeStatus={position.likeStatus}
                                        refreshItem={refreshItem}
                                        limitCount={8}
                                    />
                                );
                            })}
                        </ContainerOuterBox>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SalaryPage;

const SalaryHead = styled.div`
    & section {
        height: 390px;
        width: 780px;
    }
    & .outer {
        display: flex;
    }
    & button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    & .style_wrapper {
        width: auto;
        height: auto;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 8px 10px;
        color: #22bd79;
        background-color: #fff;
        border-radius: 3px;
        white-space: pre;
    }
    & .ButtonGroup {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: stretch;
        align-items: flex-start;
    }
    position: relative;
    // min-height: 350px;
    height: 472px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-bottom: 40px;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #22bd79;
`;

const TitleWrapper = styled.div`
    position: relative;
    padding-bottom: 20px;
    & .List_title {
        display: inline-block;
        padding: 0;
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        line-height: 1.05;
        letter-spacing: normal;
        text-align: left;
        color: #333;
    }
    & a {
        position: absolute;
        right: 24px;
        top: 4px;
        display: inline-block;
        padding: 0;
        margin: 0;
        font-size: 20px;
        font-weight: 400;
        line-height: 1;
        color: #999;
    }
`;

const ContainerOuterBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 800px;
    position: relative;
`;

const MatchupBanner = styled.div`
    & ul {
        padding-left: 0px;
    }

    & .lastItem {
        position: absolute;
        top: 6px;
        right: 0;
        width: 48px;
        height: 48px;
        background: #f8f8fa;
        border: 1px solid #eee;
        border-radius: 3px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: normal;
        color: #999;
        line-height: 48px;
        text-align: center;
    }

    & a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 54px;
        border: 0;
        border-radius: 27px;
        background-color: #36f;
        font-size: 16px;
        font-weight: 600;
        color: #fff !important;
        cursor: pointer;
    }
    & li {
        width: 48px;
        height: 48px;
        border-radius: 3px;
        border: 1px solid #eee;
        float: left;
        margin: 6px;
    }
    & .companyListContainer {
        list-style: none;
        margin: 30px -6px;
        padding-right: 28px;
        height: 55px;
        overflow: hidden;
    }
    margin: 42px 0 40px;
    padding: 55px;
    background: #fff;
    & > div:nth-child(1) {
        font-size: 40px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #258bf7;
        margin: 0 0 20px;
        word-break: keep-all;
    }
    & > div:nth-child(2) {
        font-size: 20px;
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #000;
        margin: 0 0 40px;
        word-break: keep-all;
    }
`;
