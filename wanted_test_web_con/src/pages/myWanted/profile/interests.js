import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ServerSignURL } from "../..";
import {
    InterestCompetency_list,
    InterestInsight_list,
    InterestJob_list,
} from "./interest_data";

const Interests = () => {
    const [interestJob, setInterestJob] = useState([]);
    const [interestCompetency, setInterestCompetency] = useState([]);
    const [interestInsight, setInterestInsight] = useState([]);

    const { userName, jwt, userIdx } = useSelector(
        (state) => state.LoginReducer,
    );

    const getData = async () => {
        const UURL = `${ServerSignURL}/users/${userIdx}/interests`;
        console.log(UURL);
        const data = await axios.get(UURL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
        });
        // setItemsData(data.data.result);
        console.log(data.data.result);
        setInterestJob(data.data.result.interestJob);
        setInterestCompetency(data.data.result.interestCompetency);
        setInterestInsight(data.data.result.interestInsight);
    };

    useEffect(() => getData(), [userIdx]);

    const onJobClick = (item) => {
        console.log(item);
        if (interestJob.indexOf(item) === -1) {
            setInterestJob((state) => [...state, item]);
        } else {
            setInterestJob((state) =>
                state.filter((element) => element !== item),
            );
        }
    };

    const onCompetencyClick = (item) => {
        console.log(item);
        if (interestCompetency.indexOf(item) === -1) {
            setInterestCompetency((state) => [...state, item]);
        } else {
            setInterestCompetency((state) =>
                state.filter((element) => element !== item),
            );
        }
    };

    const onInsightClick = (item) => {
        console.log(item);
        if (interestInsight.indexOf(item) === -1) {
            setInterestInsight((state) => [...state, item]);
        } else {
            setInterestInsight((state) =>
                state.filter((element) => element !== item),
            );
        }
    };

    const onInterestSave = async () => {
        const UURL = `${ServerSignURL}/users/${userIdx}/interests`;
        console.log(UURL);
        const data = await axios.post(
            UURL,
            {
                interestJob: interestJob,
                interestCompetency: interestCompetency,
                interestInsight: interestInsight,
            },

            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        // setItemsData(data.data.result);
        console.log(data);
    };

    return (
        <OuterBox>
            <section>
                <div className="Interests_contents">
                    <p>박창현님 맞춤 커리어를 가이드 해드릴게요!</p>
                    <div>
                        <div className="InterestsTags_onboarding">
                            <p>요즘 가장 큰 고민이 무엇인가요?</p>
                            <ul>
                                <li className="active">
                                    <button type="button">
                                        <img
                                            src="https://static.wanted.co.kr/images/tags/3e576196.png"
                                            alt="취업/이직"
                                        />
                                        <span>취업/이직</span>
                                    </button>
                                </li>
                                <li className="">
                                    <button type="button">
                                        <img
                                            src="https://static.wanted.co.kr/images/tags/65667fa6.png"
                                            alt="직무 역량"
                                        />
                                        <span>직무 역량</span>
                                    </button>
                                </li>
                                <li className="">
                                    <button type="button">
                                        <img
                                            src="https://static.wanted.co.kr/images/tags/8b308d58.png"
                                            alt="커리어 인사이트"
                                        />
                                        <span>커리어 인사이트</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="InterestsTags_curation">
                            <p>
                                <span>관심있는 키워드를 선택해주세요!</span>
                                <em>(복수 선택 가능)</em>
                            </p>
                            <ul>
                                <li className="InterestsTags_subTag">
                                    <div>
                                        <img
                                            src="https://static.wanted.co.kr/images/tags/2bf64212.png"
                                            alt="취업/이직"
                                        />
                                        <span>취업/이직</span>
                                    </div>
                                    <ul>
                                        {InterestJob_list.map((item, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={
                                                        interestJob.indexOf(
                                                            item,
                                                        ) !== -1
                                                            ? "active"
                                                            : null
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            onJobClick(item)
                                                        }
                                                    >
                                                        {item}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li className="InterestsTags_subTag">
                                    <div>
                                        <img
                                            src="https://static.wanted.co.kr/images/tags/36885648.png"
                                            alt="직무 역량"
                                        />
                                        <span>직무 역량</span>
                                    </div>
                                    <ul>
                                        {InterestCompetency_list.map(
                                            (item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={
                                                            interestCompetency.indexOf(
                                                                item,
                                                            ) !== -1
                                                                ? "active"
                                                                : null
                                                        }
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                onCompetencyClick(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            {item}
                                                        </button>
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </li>
                                <li className="InterestsTags_subTag">
                                    <div>
                                        <img
                                            src="https://static.wanted.co.kr/images/tags/596cc0cc.png"
                                            alt="커리어 인사이트"
                                        />
                                        <span>커리어 인사이트</span>
                                    </div>
                                    <ul>
                                        {InterestInsight_list.map(
                                            (item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={
                                                            interestInsight.indexOf(
                                                                item,
                                                            ) !== -1
                                                                ? "active"
                                                                : null
                                                        }
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                onInsightClick(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            {item}
                                                        </button>
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Interests_buttons">
                    <a
                        href="/mywanted"
                        className=""
                        aria-label=""
                        data-attribute-id="interest__gomyWanted"
                    >
                        MY원티드 돌아가기
                    </a>
                    <button
                        type="button"
                        className="style_wrapper"
                        onClick={onInterestSave}
                    >
                        관심사 저장하기
                    </button>
                </div>
            </section>
        </OuterBox>
    );
};

const OuterBox = styled.div`
    & .Interests_buttons {
        & a {
            display: block;
            text-align: center;
            width: 230px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #36f;
            color: #36f;
            border-radius: 28px;
            font-size: 16px;
            font-weight: 700;
        }
        & button {
            width: 230px;
            height: 50px;
            line-height: 50px;
            margin-left: 10px;
            border-radius: 28px;
            // background-color: #f2f4f7;
            // color: #cacaca;
            background-color: #36f;
            color: white;
            border-color: transparent;
        }
    }

    & img {
        width: 18px;
        height: 18px;
        margin-right: 6px;
        margin-top: -1px;
    }
    & .Interests_contents {
        padding: 30px 30px 28px;
        & > p {
            font-size: 16px;
            margin-bottom: 34px;
            color: #333;
            font-weight: 600;
        }
        & .InterestsTags_onboarding {
            & .active > button {
                border-color: #36f;
                color: #36f;
            }
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            font-weight: 500;
            line-height: 20px;
            border-bottom: 1px solid #ececec;
            & > ul {
                display: flex;
                & li {
                    margin: 0 10px 12px 0;
                }
                & button {
                    display: inline-flex;
                    align-items: center;
                    padding: 0 20px;
                    height: 45px;
                    line-height: 45px;
                    font-size: 14px;
                    color: #333;
                    border: 1px solid transparent;
                    border-radius: 23px;
                    background: #f0f8f8;
                }
            }
        }

        & .InterestsTags_curation {
            & li .active > button {
                border-color: #36f;
                color: #36f;
            }
            & > p {
                font-size: 14px;
                color: #666;
                margin-bottom: 10px;
                font-weight: 500;
                line-height: 20px;
                margin-bottom: 10px;
                & span {
                    padding-right: 5px;
                }
                & em {
                    display: inline-block;
                    font-size: 12px;
                    color: #939393;
                    font-style: normal;
                }
            }
            & > ul {
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                & > li {
                    margin-top: 20px;
                    min-width: 90%;
                    & div {
                        margin-bottom: 10px;
                    }
                    & li {
                        float: left;
                        margin: 0 10px 12px 0;
                        height: 42px;
                        line-height: 42px;
                        & button {
                            display: inline-flex;
                            align-items: center;
                            padding: 0 20px;
                            height: 45px;
                            line-height: 45px;
                            font-size: 14px;
                            color: #333;
                            border: 1px solid transparent;
                            border-radius: 23px;
                            background: #f0f8f8;
                        }
                    }
                }
            }
        }
    }
    & .Interests_buttons {
        padding: 30px;
        border-top: 1px solid #ececec;
        display: flex;
        justify-content: flex-end;
    }
    & section {
        background: #fff;
        border: 1px solid #e1e2e3;
        border-radius: 3px;
        display: block;
    }
    * button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    ul {
        list-style: none;
        padding-left: 0;
    }
`;

export default Interests;
