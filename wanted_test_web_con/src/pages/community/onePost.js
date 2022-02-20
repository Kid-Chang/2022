import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "..";

const OnePostPage = () => {
    const params = useParams();
    const postIdxx = params.id;
    const [commentsRight, setCommentsRight] = useState(false);
    const [newComment, setNewComment] = useState("");
    const { userName, jwt, userIdx } = useSelector(
        (state) => state.LoginReducer,
    );
    const [dataSet, setDataSet] = useState([]);
    const getData = async (title) => {
        let UURL;
        if (userIdx) {
            UURL = `${ServerSignURL}/communities/${userIdx}/${postIdxx}`;
        } else {
            UURL = `${ServerSignURL}/communities/${postIdxx}`;
        }

        console.log(UURL);
        const data = await axios.get(UURL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
        });

        console.log(data.data.result.comments.length);
        setDataSet(data.data.result);
        if (data.data.result.comments.length > 0) {
            setCommentsRight(true);
        }
    };
    useEffect(() => getData(), [userIdx]);

    const onCommentDelete = (data) => {
        const commentUserIdx = data.userIdx;
        const commentIdx = data.commentIdx;
        console.log(data);
        console.log(commentUserIdx, userIdx);
        if (userIdx == commentUserIdx) {
            console.log("itswork");
            removeComment({ commentUserIdx, commentIdx });
        }
    };

    const removeComment = async ({ commentUserIdx, commentIdx }) => {
        const data = await axios.patch(
            `${ServerSignURL}/communities/comments/${commentUserIdx}/${commentIdx}`,
            "hola",
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        console.log(data.data);
        getData();
    };

    const onChange = (e) => {
        // console.log(e.target.name);
        const {
            target: { name, value },
        } = e;

        if (name === "newComment") {
            setNewComment(value);
        }
    };

    const onUploadComment = async (E) => {
        E.preventDefault();
        const data = await axios.post(
            `${ServerSignURL}/communities/comments/${userIdx}`,
            { communityIdx: postIdxx, comment: newComment },
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        console.log(data.data);
        setNewComment("");
        getData();
    };
    useEffect(() => console.log(newComment), [newComment]);
    const navigate = useNavigate();
    const onPostEdit = () => {
        console.log(dataSet);
        if (dataSet.userName === userName) {
            navigate(`/community/edit/${postIdxx}`);
        }
    };

    return (
        <Background>
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    <InnerStyle>
                        <ASIDE>
                            <div className="name">
                                <div className="avatarWrapper">
                                    <div className="UserAvatar">
                                        <div className="avatarImg">
                                            <img
                                                src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="verticalBox">
                                            <div className="username">
                                                {dataSet.userName}
                                            </div>
                                            <div className="create_time">
                                                {dataSet.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="PostLeftSide">
                                <div>
                                    <button type="button">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M13.353 2.214c.082.164.15.332.204.502.325 1.032.13 2.08-.396 3.092l-.105.191L16.253 6a.75.75 0 0 1 .743.648l.007.102v5.75a.75.75 0 0 1-.106.385l-.058.084-3.004 3.75a.75.75 0 0 1-.472.273L13.25 17H9.22a.75.75 0 0 1-.101-1.493l.102-.007h3.668l2.614-3.264V7.5h-3.91a.75.75 0 0 1-.604-1.195l.066-.077c.137-.14.36-.415.584-.778.5-.808.702-1.6.487-2.283a1.858 1.858 0 0 0-.113-.278c-.278-.551-1.075-.442-1.075-.056a3.17 3.17 0 0 1-.777 2.125c-.293.338-.59.555-.774.647l-.472.292c-.89.568-1.459 1.04-1.762 1.409l-.097.128-.058.095v.062l-.004.016-.006.093a.75.75 0 0 1-.641.641l-.102.007-.102-.007a.75.75 0 0 1-.648-.743V7.5H2.496v8h2.999l-.001-4.535.007-.102a.75.75 0 0 1 1.493.102v5.286l-.007.102a.75.75 0 0 1-.743.648H1.747l-.102-.007a.75.75 0 0 1-.648-.743v-9.5l.007-.102A.75.75 0 0 1 1.747 6h4.498l.066.005c.387-.38.92-.796 1.621-1.256l.472-.3.253-.154c.07-.035.217-.143.37-.32.226-.26.37-.576.403-.969l.008-.173c0-2.082 2.972-2.491 3.915-.619z"
                                            ></path>
                                        </svg>
                                        <span className="count">
                                            {dataSet.likeNum}
                                        </span>
                                    </button>
                                </div>
                                <div>
                                    <button type="button">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                fill="currentColor"
                                                transform="matrix(-1 0 0 1 18 0)"
                                                d="M9 1c4.377 0 8 3.14 8 7s-3.623 7-8 7c-.317 0-.593-.026-.954-.088l-.395-.074-.205-.043-3.295 2.089a.75.75 0 0 1-.968-.143l-.067-.09a.75.75 0 0 1 .143-.968l.09-.067 3.55-2.25a.75.75 0 0 1 .551-.1l.652.132.301.052c.228.036.408.05.597.05 3.592 0 6.5-2.52 6.5-5.5S12.592 2.5 9 2.5C5.407 2.5 2.5 5.02 2.5 8c0 1.858 1.039 3.573 2.773 4.348a.75.75 0 1 1-.612 1.37C2.37 12.693 1 10.432 1 8c0-3.86 3.622-7 8-7z"
                                            ></path>
                                        </svg>
                                        <span className="count">
                                            {dataSet.commentNum}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </ASIDE>
                        <MainSection>
                            <article>
                                <div className="PostContents_PostContents__header__Z_Y18">
                                    <div className="UserAvatar">
                                        <div className="avatarImg">
                                            <img
                                                src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="verticalBox"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div className="username">
                                                {dataSet.userName}
                                            </div>
                                            <div
                                                className="create_time"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                ·&nbsp;&nbsp;
                                                {dataSet.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="headline">
                                        {dataSet.title}
                                    </h1>
                                </div>
                                <div className="body"> {dataSet.content}</div>
                                <div className="likeAndComment">
                                    <div>
                                        <button type="button">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M13.353 2.214c.082.164.15.332.204.502.325 1.032.13 2.08-.396 3.092l-.105.191L16.253 6a.75.75 0 0 1 .743.648l.007.102v5.75a.75.75 0 0 1-.106.385l-.058.084-3.004 3.75a.75.75 0 0 1-.472.273L13.25 17H9.22a.75.75 0 0 1-.101-1.493l.102-.007h3.668l2.614-3.264V7.5h-3.91a.75.75 0 0 1-.604-1.195l.066-.077c.137-.14.36-.415.584-.778.5-.808.702-1.6.487-2.283a1.858 1.858 0 0 0-.113-.278c-.278-.551-1.075-.442-1.075-.056a3.17 3.17 0 0 1-.777 2.125c-.293.338-.59.555-.774.647l-.472.292c-.89.568-1.459 1.04-1.762 1.409l-.097.128-.058.095v.062l-.004.016-.006.093a.75.75 0 0 1-.641.641l-.102.007-.102-.007a.75.75 0 0 1-.648-.743V7.5H2.496v8h2.999l-.001-4.535.007-.102a.75.75 0 0 1 1.493.102v5.286l-.007.102a.75.75 0 0 1-.743.648H1.747l-.102-.007a.75.75 0 0 1-.648-.743v-9.5l.007-.102A.75.75 0 0 1 1.747 6h4.498l.066.005c.387-.38.92-.796 1.621-1.256l.472-.3.253-.154c.07-.035.217-.143.37-.32.226-.26.37-.576.403-.969l.008-.173c0-2.082 2.972-2.491 3.915-.619z"
                                                ></path>
                                            </svg>
                                            <span className="count">
                                                {dataSet.likeNum}
                                            </span>
                                        </button>
                                    </div>
                                    <div style={{ marginRight: "auto" }}>
                                        <button type="button">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    transform="matrix(-1 0 0 1 18 0)"
                                                    d="M9 1c4.377 0 8 3.14 8 7s-3.623 7-8 7c-.317 0-.593-.026-.954-.088l-.395-.074-.205-.043-3.295 2.089a.75.75 0 0 1-.968-.143l-.067-.09a.75.75 0 0 1 .143-.968l.09-.067 3.55-2.25a.75.75 0 0 1 .551-.1l.652.132.301.052c.228.036.408.05.597.05 3.592 0 6.5-2.52 6.5-5.5S12.592 2.5 9 2.5C5.407 2.5 2.5 5.02 2.5 8c0 1.858 1.039 3.573 2.773 4.348a.75.75 0 1 1-.612 1.37C2.37 12.693 1 10.432 1 8c0-3.86 3.622-7 8-7z"
                                                ></path>
                                            </svg>
                                            <span className="count">
                                                {dataSet.commentNum}
                                            </span>
                                        </button>
                                    </div>
                                    <button type="button" onClick={onPostEdit}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M12 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 12 10zm7 0a2 2 0 1 1-.001 4.001A2 2 0 0 1 19 10zM5 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 5 10z"
                                            ></path>
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            </article>
                            <CommentsView>
                                <CommentBox>
                                    {commentsRight ? (
                                        dataSet.comments.map((data, index) => {
                                            console.log(data);
                                            return (
                                                <div
                                                    className="commentItem"
                                                    key={index}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div className="UserAvatar">
                                                            <div className="avatarImg">
                                                                <img
                                                                    src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div
                                                                className="verticalBox"
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <div className="username">
                                                                    {
                                                                        data.userName
                                                                    }
                                                                </div>
                                                                <div
                                                                    className="create_time"
                                                                    style={{
                                                                        marginLeft:
                                                                            "5px",
                                                                    }}
                                                                >
                                                                    ·&nbsp;&nbsp;
                                                                    {
                                                                        data.createdAt
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="CommentItem__menu"
                                                            onClick={() =>
                                                                onCommentDelete(
                                                                    data,
                                                                )
                                                            }
                                                        >
                                                            <svg
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M12 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 12 10zm7 0a2 2 0 1 1-.001 4.001A2 2 0 0 1 19 10zM5 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 5 10z"
                                                                ></path>
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <div className="contents">
                                                        {data.comment}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <>
                                            <img
                                                src="https://static.wanted.co.kr/images/community/community-3d-comment.png"
                                                alt="speech-bubble"
                                                className="speech-bubble"
                                            />
                                            <p className="nullMSG">
                                                첫 댓글을 남겨주세요.
                                            </p>
                                        </>
                                    )}
                                </CommentBox>
                                <UserAvatar>
                                    <div className="UserAvatar">
                                        <div className="avatarImg">
                                            <img
                                                src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="verticalBox">
                                            <div className="username">
                                                {userName}
                                            </div>
                                        </div>
                                    </div>
                                </UserAvatar>
                                <InputTextBox>
                                    <form>
                                        <input
                                            name="newComment"
                                            value={newComment}
                                            onChange={onChange}
                                            className="CommentWrite"
                                            placeholder="댓글 작성"
                                        ></input>
                                        {newComment !== "" ? (
                                            <button
                                                className="saveButton"
                                                type="submit"
                                                disabled=""
                                                onClick={onUploadComment}
                                                style={{
                                                    backgroundColor: "#36f",
                                                    color: "white",
                                                }}
                                            >
                                                <span className="label">
                                                    등록
                                                </span>
                                                {/* 작성에 따라 색상 변경 */}
                                            </button>
                                        ) : (
                                            <button
                                                className="saveButton"
                                                type="submit"
                                                disabled=""
                                                onClick={onUploadComment}
                                            >
                                                <span className="label">
                                                    등록
                                                </span>
                                                {/* 작성에 따라 색상 변경 */}
                                            </button>
                                        )}
                                    </form>
                                </InputTextBox>
                                <button className="goList">
                                    <Link to="/community">{`<`} 목록으로</Link>
                                </button>
                            </CommentsView>
                        </MainSection>
                    </InnerStyle>
                </Col>
            </Row>
        </Background>
    );
};

const UserAvatar = styled.div`
    padding-bottom: 18px;
`;

const InputTextBox = styled.div`
    & .saveButton {
        width: 70px;
        height: 32px;
        padding: 0;
        position: absolute;
        bottom: 15px;
        right: 15px;
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
    & input {
        width: 100%;
        height: 84px;
        padding: 16px 20px;
        border: 0;
        resize: none;
        outline: none;
    }
    & .saveButton {
        width: 70px;
        height: 32px;
        padding: 0;
        position: absolute;
        bottom: 15px;
        right: 15px;
        background-color: #f2f4f7;
        color: #ccc;
    }
    border-radius: 4px;
    border: 1px solid #e1e2e3;
    background-color: #fff;
    height: 146px;
    position: relative;
    overflow: hidden;
`;

const CommentBox = styled.div`
    & .contents {
        margin-top: 18px;
        margin-bottom: 25px;
        font-size: 14px;
        line-height: 1.43;
        color: #333;
        white-space: pre-wrap;
        word-break: break-word;
        word-wrap: break-word;
    }
    & .commentItem {
        width: 100%;
        border-bottom: 1px solid #ececec;
        margin-bottom: 25px;
    }
    & .speech-bubble {
        width: 75px;
        height: 75px;
    }
    & .nullMSG {
        margin-top: 12px;
        color: #666;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    // height: 208px;
    margin-bottom: 21px;
`;

const CommentsView = styled.div`
    & .goList {
        height: 32px;
        padding: 0 16px;
        margin-top: 30px;
        border: 1px solid #e1e2e3;
        color: #333;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        box-sizing: border-box;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
        font-size: 14px;
    }
    padding: 25px 39px 100px;
    background-color: #fff;
    border: 1px solid #e1e2e3;
    border-top: 0;
`;

const MainSection = styled.section`
    & a {
        color: black;
    }
    & .likeAndComment {
        display: flex;
        padding: 0 6px;
        & > div:nth-child(1) {
            margin-right: 40px;
        }
        & .count {
            margin-left: 6px;
            line-height: 100%;
            font-size: 13px;
            font-weight: 700;
        }
    }
    width: 800px;
    & > article {
        padding: 56px 39px 40px;
        background-color: #fff;
        border: 1px solid #e1e2e3;
    }
    & .headline {
        font-size: 28px;
        font-weight: 700;
        color: #333;
        word-break: break-all;
        margin-top: 88px;
        margin-bottom: 32px;
    }
    & .body {
        max-width: 710px;
        margin-bottom: 80px;
        font-size: 17px;
        line-height: 1.65;
        color: #333;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: keep-all;
    }
`;

const ASIDE = styled.aside`
    margin-right: 100px;
    position: sticky;
    top: 165px;
    width: 180px;

    & .PostLeftSide {
        display: flex;
        padding: 0 6px;
        & > div:nth-child(1) {
            margin-right: 40px;
        }
        & .count {
            margin-left: 6px;
            line-height: 100%;
            font-size: 13px;
            font-weight: 700;
        }
    }

    & .name {
        padding-bottom: 30px;
        border-bottom: 1px solid #e1e2e3;
        margin-bottom: 25px;
        padding-left: 6px;
    }
`;

const InnerStyle = styled.div`
    & .verticalBox {
        margin-left: 20px;
    }
    display: flex;
    width: 1070px;
    margin: 100px auto 0;
    & .UserAvatar {
        display: flex;
        align-items: center;
        & .avatarImg {
            width: 36px;
            height: 36px;
            border: 1px solid #ececec;
            border-radius: 50%;
            overflow: hidden;
        }
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        & .username {
            font-weight: 700;
            font-size: 16px;
        }
        & .create_time {
            color: #666;
            font-size: 13px;
        }
    }
`;

const Background = styled.div`
    & button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
    }
    position: absolute;
    width: 100%;
    z-index: 300;
    background-color: rgb(248, 248, 248);
    min-height: 100%;
`;

export default OnePostPage;
