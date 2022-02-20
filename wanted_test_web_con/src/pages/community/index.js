import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";
import { com_tag_list } from "./tag_list";

const OnePostItem = ({ data }) => {
    console.log(data);
    const Idx = data.communityIdx;
    return (
        <Link to={`post/${Idx}`}>
            <article className="article">
                <div className="top">
                    <div className="AuthorBox">
                        <div className="avatarWrapper">
                            <img
                                src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                alt=""
                            />
                        </div>
                        <span className="username">
                            &nbsp;&nbsp;&nbsp; {data.userName}
                        </span>
                        <span className="create_time">
                            &nbsp;&nbsp; {data.createdAt}
                        </span>
                    </div>
                </div>
                <div className="contentBox">
                    <h3 className="title">{data.title}</h3>
                    <p className="content">{data.content}</p>
                </div>
                <div className="likeNCommentBox">
                    <div>
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path
                                fill="currentColor"
                                d="M13.353 2.214c.082.164.15.332.204.502.325 1.032.13 2.08-.396 3.092l-.105.191L16.253 6a.75.75 0 0 1 .743.648l.007.102v5.75a.75.75 0 0 1-.106.385l-.058.084-3.004 3.75a.75.75 0 0 1-.472.273L13.25 17H9.22a.75.75 0 0 1-.101-1.493l.102-.007h3.668l2.614-3.264V7.5h-3.91a.75.75 0 0 1-.604-1.195l.066-.077c.137-.14.36-.415.584-.778.5-.808.702-1.6.487-2.283a1.858 1.858 0 0 0-.113-.278c-.278-.551-1.075-.442-1.075-.056a3.17 3.17 0 0 1-.777 2.125c-.293.338-.59.555-.774.647l-.472.292c-.89.568-1.459 1.04-1.762 1.409l-.097.128-.058.095v.062l-.004.016-.006.093a.75.75 0 0 1-.641.641l-.102.007-.102-.007a.75.75 0 0 1-.648-.743V7.5H2.496v8h2.999l-.001-4.535.007-.102a.75.75 0 0 1 1.493.102v5.286l-.007.102a.75.75 0 0 1-.743.648H1.747l-.102-.007a.75.75 0 0 1-.648-.743v-9.5l.007-.102A.75.75 0 0 1 1.747 6h4.498l.066.005c.387-.38.92-.796 1.621-1.256l.472-.3.253-.154c.07-.035.217-.143.37-.32.226-.26.37-.576.403-.969l.008-.173c0-2.082 2.972-2.491 3.915-.619z"
                            ></path>
                        </svg>

                        <span className="count">{data.likeNum}</span>
                    </div>
                    <div>
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path
                                fill="currentColor"
                                transform="matrix(-1 0 0 1 18 0)"
                                d="M9 1c4.377 0 8 3.14 8 7s-3.623 7-8 7c-.317 0-.593-.026-.954-.088l-.395-.074-.205-.043-3.295 2.089a.75.75 0 0 1-.968-.143l-.067-.09a.75.75 0 0 1 .143-.968l.09-.067 3.55-2.25a.75.75 0 0 1 .551-.1l.652.132.301.052c.228.036.408.05.597.05 3.592 0 6.5-2.52 6.5-5.5S12.592 2.5 9 2.5C5.407 2.5 2.5 5.02 2.5 8c0 1.858 1.039 3.573 2.773 4.348a.75.75 0 1 1-.612 1.37C2.37 12.693 1 10.432 1 8c0-3.86 3.622-7 8-7z"
                            ></path>
                        </svg>

                        <span className="count">{data.commentNum}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

const CommunityPage = () => {
    const [category, setCategory] = useState("커리어 고민");
    const onCategoryClick = (tag) => {
        setCategory(tag);
        getData(tag);
        // console.log("title: " + tag);
    };
    const mainTitle = com_tag_list.filter((value) => value[1] === category);

    //api 통신

    const { userName, jwt, userIdx } = useSelector(
        (state) => state.LoginReducer,
    );
    const [itemsData, setItemsData] = useState([]);
    // const [UURL, setUURL] = useState("");
    const getData = async (title) => {
        console.log(mainTitle[0][1]);
        let UURL;
        if (userIdx) {
            UURL = `${ServerSignURL}/communities/${userIdx}/community-list`;
        } else {
            UURL = `${ServerSignURL}/communities/community-list`;
        }
        console.log(userIdx);
        console.log(UURL);
        const data = await axios.get(UURL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: {
                category: `${title}`,
            },
        });
        setItemsData(data.data.result);
        console.log(data.data.result);
    };
    useEffect(() => getData("커리어 고민"), []);

    return (
        <Background>
            <div>
                <Row className="justify-content-md-center">
                    <Col style={{ maxWidth: "1090px" }}>
                        <Outer>
                            <LeftTab>
                                <h2>카테고리</h2>
                                <ul>
                                    {com_tag_list.map((tag, index) => {
                                        return (
                                            <div key={index}>
                                                {tag[1] === category ? (
                                                    <li
                                                        className="focus"
                                                        onClick={() =>
                                                            onCategoryClick(
                                                                tag[1],
                                                            )
                                                        }
                                                    >
                                                        <span className="navIcon">
                                                            {tag[0]}
                                                        </span>
                                                        <span className="navName">
                                                            {tag[1]}
                                                        </span>
                                                    </li>
                                                ) : (
                                                    <li
                                                        onClick={() =>
                                                            onCategoryClick(
                                                                tag[1],
                                                            )
                                                        }
                                                    >
                                                        <span className="navIcon">
                                                            {tag[0]}
                                                        </span>
                                                        <span className="navName">
                                                            {tag[1]}
                                                        </span>
                                                    </li>
                                                )}
                                            </div>
                                        );
                                    })}
                                </ul>
                            </LeftTab>
                            <MainTab>
                                <h1>
                                    <span>{mainTitle[0][0]}</span>
                                    <span>{mainTitle[0][1]}</span>
                                </h1>
                                <section className="PostWriteBox">
                                    <div className="UserAvatar_UserAvatar__Wi20b PostWriteButton_avatar__qnU_N">
                                        <img
                                            src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                            alt="avatar_image"
                                        />
                                    </div>
                                    <button>
                                        <Link to="write">
                                            커리어와 라이프스타일에 대해
                                            자유롭게 이야기 해주세요!
                                            <svg className="PostWriteButton_writeIcon">
                                                <svg width="24" height="24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M17.21 2.23a.75.75 0 0 1 1.07-.01l3.5 3.5a.75.75 0 0 1 .011 1.05l-12 12.5a.75.75 0 1 1-1.082-1.04l8.062-8.398-2.451-2.451L4.5 17.553V20h2.75a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 .21-.52zm.55 1.59-2.397 2.482 2.447 2.447 2.39-2.488-2.44-2.441z"
                                                    ></path>
                                                </svg>
                                            </svg>
                                        </Link>
                                    </button>
                                </section>
                                <PostView>
                                    {itemsData.map((data, index) => {
                                        return (
                                            <OnePostItem
                                                key={index}
                                                data={data}
                                            />
                                        );
                                    })}
                                </PostView>
                            </MainTab>
                        </Outer>
                    </Col>
                </Row>
            </div>
        </Background>
    );
};

export default CommunityPage;

const PostView = styled.div`
    & .likeNCommentBox {
        color: #666;
        display: flex;
        & div:nth-child(1) {
            // display: flex;
            width: 53px;
        }
        & .count {
            font-size: 12px;
            margin-left: 4px;
            padding: 0.3em 0 0;
        }
    }

    & .contentBox {
        & .title {
            font-size: 19px;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
            line-height: 23px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        & .content {
            font-size: 14px;
            color: #666;
            line-height: 1.43;
            margin-bottom: 15px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: break-spaces;
            word-break: break-all;
            overflow: hidden;
        }
    }

    & .top {
        margin-bottom: 14px;
        & .AuthorBox {
            display: flex;
            align-items: center;
        }
        & .username {
            color: #000;
            font-size: 13px;
            font-weight: 700;
        }
        & .create_time {
            color: #666;
            font-size: 12px;
            line-height: 100%;
        }
    }

    a {
        color: black;
        display: block;
        padding: 29px 29px 30px;
        // margin-bottom: 30px;
        border-bottom: 1px solid #ececec;
        margin-bottom: 2px;
        position: relative;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #e1e2e3;
    border-top: 0;
    & .avatarWrapper {
        width: 28px;
        height: 28px;
        border: 1px solid #ececec;
        border-radius: 50%;
        overflow: hidden;
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;

const MainTab = styled.div`
    a {
        color: black;
    }
    & .PostWriteBox {
        padding: 29px 29px 31px;
        border-radius: 5px 5px 0 0;
        border: 1px solid #e1e2e3;
        background-color: #fff;
        display: flex;
        align-items: center;
        & button {
            flex: 1 1;
            height: 56px;
            padding: 0 19px;
            border-radius: 4px;
            border: 1px solid #e1e2e3;
            background-color: #fff;
            cursor: pointer;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        & img {
            width: 38px;
            height: 38px;
            margin-right: 23px;
            border: 1px solid #ececec;
            border-radius: 50%;
            overflow: hidden;
            background-color: #d8d8d8;
        }
        & svg {
            display: inline-block;
            width: 24px;
            height: 24px;
        }
    }
    & h1 {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 15px;
        padding-left: 11px;
        min-height: 1.1em;
        & span:nth-child(1) {
            margin-right: 7px;
            font-weight: 400;
        }
    }
    width: 100%;
    height: 100%;
    margin-top: 73px;
    display: flex;
    flex-direction: column;
`;

const LeftTab = styled.div`
    flex: 0 0 250px;
    padding: 0 8px;
    margin-right: 20px;
    margin-top: 111px;
    & h2 {
        font-size: 14px;
        color: #666;
        margin-bottom: 22px;
        font-weight: 400;
    }
    & .focus {
        border-radius: 5px;
        background-color: #fff;
        border: 1px solid #e1e2e3;
        color: #36f;
        font-weight: 700;
        pointer-events: none;
    }
    & li {
        display: flex;
        height: 42px;
        color: #000;
        width: 100%;
        padding: 0 16px;
        align-items: center;
        & span:nth-child(1) {
            font-size: 25px;
            margin-right: 16px;
            margin-left: -8px;
            font-weight: 400;
        }
        & span:nth-child(2) {
            font-size: 16px;
            line-height: 17px;
            margin-right: auto;
            cursor: pointer;
            max-width: 218px;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
`;

const Outer = styled.div`
    display: flex;
`;

const Background = styled.div`
    position: absolute;
    width: 100%;
    z-index: 300;
    background-color: rgb(248, 248, 248);
    min-height: 100%;
`;
