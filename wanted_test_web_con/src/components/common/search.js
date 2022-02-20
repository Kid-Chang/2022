import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ServerSignURL } from "../../pages";
import { useSelector } from "react-redux";

const Search = ({ showSearch, onSearchClick }) => {
    const [searchText, setSearchText] = useState("");
    const InputRef = useRef();
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        //여기에 통신 axios, useNav이용.
        // console.log(searchText);
        navigate(`/search?query=${searchText}`);
        onSearchClick();
        setSearchText("");
        // const data = await axios.get(
        //     `${ServerSignURL}/companies/search/${userIdx}`,
        //     {
        //         params: { query: searchText, limit: 6 },
        //     },
        // );
        // const {
        //     data: { result },
        // } = data;
        // console.log(result);
    };

    const onChange = (e) => {
        console.log(e.target.name);
        const {
            target: { name, value },
        } = e;
        setSearchText(value);
    };
    useEffect(() => {
        if (showSearch) {
            InputRef.current.focus();
        }
    }, [showSearch]);
    return (
        <>
            {showSearch ? (
                <>
                    <OuterBox>
                        {/* <div>helloworld</div> */}
                        <PopUpWindowStyle>
                            <Row className="justify-content-md-center">
                                <Col
                                    style={{
                                        maxWidth: "1090px",
                                    }}
                                >
                                    <SearchBar>
                                        <form onSubmit={onSubmit}>
                                            <input
                                                type="search"
                                                placeholder="#태그, 회사, 포지션 검색"
                                                autoComplete="off"
                                                value={searchText}
                                                ref={InputRef}
                                                onChange={onChange}
                                            />
                                            <FontAwesomeIcon icon={faSearch} />
                                        </form>
                                        <ResultContainer>
                                            <h4 className="RecentSearchResults_searchLabelClass__l5R6_">
                                                추천태그로 검색해보세요
                                            </h4>
                                            <Link to="/tag_search">
                                                기업태그 홈 이동하기
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
                                            <ul className="tagList">
                                                <li className="tagListItem">
                                                    <button>#어학교육</button>
                                                </li>
                                                <li className="tagListItem">
                                                    <button>
                                                        #연봉상위2~5%
                                                    </button>
                                                </li>
                                                <li className="tagListItem">
                                                    <button>
                                                        #퇴사율5%이하
                                                    </button>
                                                </li>
                                                <li className="tagListItem">
                                                    <button>#야근없음</button>
                                                </li>
                                                <li className="tagListItem">
                                                    <button>#핀테크</button>
                                                </li>
                                            </ul>
                                        </ResultContainer>
                                        <AlertWindowBox>
                                            <AlertWindowOutBox
                                                onClick={() => {
                                                    onSearchClick();
                                                }}
                                            ></AlertWindowOutBox>
                                        </AlertWindowBox>
                                    </SearchBar>
                                </Col>
                            </Row>
                        </PopUpWindowStyle>
                    </OuterBox>
                </>
            ) : null}
        </>
    );
};
const ResultContainer = styled.div`
    position: relative;
    margin: 0 auto;
    padding: 50px 0 0;
    max-width: 1060px;
    & li {
        float: left;
        width: auto;
        position: relative;
        display: block;
        font-size: 18px;
        font-weight: 400;
        line-height: 35px;
        color: #333;
        & > button {
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            font-weight: 400;
            color: #333;
            margin-left: 10px;
            margin-bottom: 10px;
            padding: 0 26px;
            background-color: #f3f5f8;
            border-radius: 25px;
        }
    }
    & a {
        float: right;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: #767676 !important;
    }
`;

const SearchBar = styled.div`
    width: 100%;
    max-width: 1060px;
    margin: 0 auto;
    padding: 30px 0 100px;
    position: relative;
    background-color: white;
    & h4 {
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        color: #333;
    }
    & form input {
        height: 50px;
        line-height: 50px;
        width: 100%;
        margin: 0;
        padding: 0 36px 0 60px;
        border: 1px solid #f2f4f7;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 400;
        color: #767676;
        background-color: #f2f4f7;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:focus {
            background-color: white;
        }
    }
    & form svg {
        position: absolute;
        top: 54px;
        left: 20px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        color: #939393;
        width: 18px;
        height: 18px;
        margin: 0 16px 0 6px;
    }
`;

const OuterBox = styled.div`
z-index:7000;
& button{
    margin: 0;
    padding: 0;
    border: 0;
}
    // display: float;
    width: 100%;
    height:
    top: 0%;
    position: fixed;
    // transform: translateX(-48%);
    // transform: translate(-48%, 60%);
    left: 0;
    // display: flex;
    
    flex-direction: column;
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;

const AlertWindowOutBox = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const AlertWindowBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

const PopUpWindowStyle = styled.div`
    position: absolute;
    width: 100%;
    top: -50px;
    background-color: white;

    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2),
        0 6px 40px 0 rgba(0, 0, 0, 0.19);
    background-color: white;
    // & {
    //     background: #ffff;
    // }
`;

// const SearchFormWindow = styled(PopUpWindowStyle)`
//     // display: float;
//     // width: 100%;
//     // height: 680px;
//     top: -50px;
//     position: absolute;
//     // // transform: translateX(-48%);
//     // // transform: translate(-48%, 60%);
//     // left: 0
//     // display: flex;
//     // z-index: 600;
//     // flex-direction: column;
//     // & > div:nth-child(1) {
//     //     display: flex;
//     //     justify-content: center;
//     //     padding: 16px 20px;
//     // }
//     // background-color: green;
//     left: 0;
//     top: 0;
//     width: 100%;
//     position: absolute;
//     background: #fff;
// `;

export default Search;
