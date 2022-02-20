import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";
import WdListSearch from "./wdList";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompanyItem = ({ data }) => {
    //     companyIdx: 1
    // companyName: "씨제이올리브영(CJ올리브영)"
    // followStatus: "false"
    // industry: "IT, 컨텐츠"
    // logo: "https://static.wanted.co.kr/images/wdes/0_4.f4087e82.jpg"
    // console.log(data);
    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);
    const [nowFollow, setNowFollow] = useState(data.followStatus);

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
                    companyIdx: data.companyIdx, // 값 수정해야함.
                },
            },
        );
        // console.log(ApiData.data.result.likeNum);
        console.log(ApiData.data.result);
        console.log(ApiData.data.result.followStatus);
        setNowFollow(ApiData.data.result.followStatus);
        // getData();
    };
    return (
        <CompanyInfo>
            <Link className="company_click" to={`/company/${data.companyIdx}`}>
                <div
                    className="logo"
                    style={{
                        backgroundImage: `url("${data.logo}")`,
                        backgroundSize: "cover",
                    }}
                ></div>
                <div>
                    <h5>{data.companyName}</h5>
                    <h6>{data.industry}</h6>
                </div>
            </Link>
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
        </CompanyInfo>
    );
};
const CompanyInfo = styled.div`
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
    display: flex;
    height: 100px;
    width: 50%;
    border-radius: 3px;
    border: 1px solid #e1e2e3;
    padding: 20px;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    margin: 80px 0 0;
    display: flex;
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
`;

const SearchPage = () => {
    // const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("query");
    const [dataSet, setDataSet] = useState([]);
    const { userIdx, jwt } = useSelector((state) => state.LoginReducer);
    const [companylist, setCompanyList] = useState([]);
    const getData = async () => {
        const SURL = `${ServerSignURL}/companies/search/${userIdx}`;
        console.log(SURL);
        const data = await axios.get(SURL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: { query: search, limit: 6 },
        });
        const {
            data: { result },
        } = data;
        // console.log(data);
        setDataSet(result);
        console.log(data);
        setCompanyList(result.companies);
    };

    useEffect(() => {
        getData();
        console.log(userIdx);
    }, [searchParams]);
    //     companies: Array(1)
    // 0:
    // companyIdx: 1
    // companyName: "씨제이올리브영(CJ올리브영)"
    // followStatus: "false"
    // industry: "IT, 컨텐츠"
    // logo: "https://static.wanted.co.kr/images/wdes/0_4.f4087e82.jpg"

    return (
        <>
            {dataSet && (
                <OuterBox>
                    <div className="nameBox">
                        <button>{search}</button>
                    </div>
                    <SearchContainer>
                        <div className="search_section_company">
                            <h2>
                                회사<span>{dataSet.companyNum}</span>
                            </h2>
                            <button style={{ right: "62px" }}>
                                <FontAwesomeIcon icon={faChevronLeft} />{" "}
                            </button>
                            <button style={{ right: "10px" }}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                            <div className="companyList">
                                <div className="slick-list">
                                    <SlickTrack>
                                        {companylist &&
                                            companylist.map((item, idx) => {
                                                return (
                                                    <CompanyItem
                                                        data={item}
                                                        key={idx}
                                                    />
                                                );
                                            })}
                                    </SlickTrack>
                                </div>
                            </div>
                        </div>
                        <div className="search_section_position">
                            <h2>
                                포지션<span>{dataSet.positionNum}</span>
                            </h2>
                            <FilterInWdlist>
                                <div className="Selector">
                                    {/* <select>
                                        <option>응답률순</option>
                                        <option>최신순</option>
                                        <option>보상금순</option>
                                        <option>인기순</option>
                                    </select> */}
                                </div>
                            </FilterInWdlist>

                            <WdListSearch />
                        </div>
                    </SearchContainer>
                </OuterBox>
            )}
        </>
    );
};

export default SearchPage;

const FilterInWdlist = styled.div`
    margin-bottom: 19px;
    padding-top: 10px;
    display: flex;
`;

const SlickTrack = styled.div`
    & .CompanyItem_logoClass {
        width: 58px;
        height: 58px;
        margin-right: 20px;
        background-size: 100%;
        background-position: 50%;
        background-repeat: no-repeat;
    }
    & .CompanyItem_textClass {
        width: calc(100% - 78px);
        height: 58px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        & h5 {
            color: #333;
            font-size: 18px;
            font-weight: 400;
            line-height: 27px;
            margin-bottom: 4px;
            margin: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        & h6 {
            color: #999;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
    }
    & .CompanyItem {
        display: flex;
        flex-direction: row;
        width: calc(100% - 110px);
    }
    // & a {
    //     width: calc(50% - 20px);
    //     margin: 10px;
    //     float: left;
    //     display: flex;
    //     flex-direction: row;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 21px 20px;
    //     background: #fff;
    //     border-radius: 2px;
    // }
`;

const SearchContainer = styled.div`
    & .companyList {
        margin: -10px;
        position: relative;
    }
    & button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    margin: 60px auto 80px;
    max-width: 1060px;
    & .search_section_company {
        padding-bottom: 60px;
        position: relative;
        height: 486px;
    }
    & h2 {
        font-size: 24px;
        font-weight: 600;
        line-height: 36px;
        margin-bottom: 18px;
        color: #333;
        & span {
            margin-left: 10px;
            font-weight: 400;
        }
    }
    & > div > button {
        position: absolute;
        top: -17px;

        width: 42px;
        height: 42px;
        border-radius: 21px;
        line-height: 42px;
        background-color: #fff;
    }
`;

const OuterBox = styled.div`
    background-color: rgb(248, 248, 248);
    min-height: 1000px;
    & .nameBox {
        position: relative;
        width: 100%;
        height: 140px;
        background: #fff;
        border-bottom: 1px solid #e1e2e3;
        z-index: 1;

        & button {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 90%;
            font-size: 48px;
            line-height: 2;
            color: #333;
            padding: 0;
            margin: 0;
            border: 0;
            cursor: pointer;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            background: none;
        }
    }
`;
