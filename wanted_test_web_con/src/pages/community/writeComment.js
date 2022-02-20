import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ServerSignURL } from "../index";

const WriteCommentPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [galary, setGalary] = useState("");
    const [submitOk, setSubmitOk] = useState(false);
    useEffect(() => {
        if (title !== "" && content !== "" && galary !== "") {
            setSubmitOk(true);
        }
    }, [title, content, galary]);

    const onChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.name);
        const {
            target: { name, value },
        } = e;

        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        } else if (name === "galary") {
            // console.log(value);
            setGalary(value);
        }
    };

    const { userName, jwt, userIdx } = useSelector(
        (state) => state.LoginReducer,
    );
    const navigate = useNavigate();
    const onSubmitClick = async () => {
        console.log(title, content, galary);
        // console.log(jwt);
        const data = await axios.post(
            `${ServerSignURL}/communities/${userIdx}`,
            { title: title, content: content, category: galary },
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
            },
        );
        // console.log("resutl:");
        console.log(data.data);
        navigate("/community");
    };

    return (
        <Background>
            <Header>
                <div className="content">
                    <div className="select" name="galary">
                        <select onChange={onChange} name="galary">
                            <option value="" disabled="">
                                게시판을 선택해주세요.
                            </option>
                            <option value="커리어 고민">커리어 고민</option>
                            <option value="꿀팁">꿀팁</option>
                            <option value="콘텐츠 추천">콘텐츠 추천</option>
                            <option value="마케팅">마케팅</option>
                            <option value="디자인">디자인</option>
                            <option value="개발">개발</option>
                            <option value="HR">HR</option>
                            <option value="일상">일상</option>
                            <option value="유머">유머</option>
                        </select>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M16 9.25a.75.75 0 01.586 1.218l-3.986 5a.75.75 0 01-1.17.002l-4.015-5A.75.75 0 018 9.25h8z"
                            ></path>
                        </svg>
                    </div>
                    {submitOk ? (
                        <div className="submit" onClick={onSubmitClick}>
                            <button
                                style={{
                                    backgroundColor: "#36f",
                                    color: "white",
                                }}
                            >
                                등록하기
                            </button>
                        </div>
                    ) : (
                        <div className="submit">
                            <button style={{ cursor: "not-allowed" }}>
                                등록하기
                            </button>
                        </div>
                    )}
                </div>
            </Header>
            <Row className="justify-content-md-center">
                <Col style={{ maxWidth: "1090px" }}>
                    <InnerStyle>
                        <WriteContent>
                            <div className="paper">
                                <div className="inputTitleArea">
                                    <textarea
                                        onChange={onChange}
                                        value={title}
                                        className="inputText titleText"
                                        type="text"
                                        name="title"
                                        placeholder="제목을 입력해주세요."
                                        required=""
                                        style={{ height: "39px" }}
                                    ></textarea>
                                </div>
                                <div className="inputTextArea">
                                    <textarea
                                        onChange={onChange}
                                        value={content}
                                        className="inputText contentText"
                                        type="text"
                                        name="content"
                                        placeholder="내용을 작성해주세요."
                                        required=""
                                        style={{ height: "57px" }}
                                    ></textarea>
                                </div>
                            </div>
                        </WriteContent>
                    </InnerStyle>
                </Col>
            </Row>
        </Background>
    );
};
export default WriteCommentPage;

const WriteContent = styled.div`
    & .inputTextArea {
        width: 100%;
        padding-top: 28px;
        font-size: 17px;
        font-weight: 400;
        line-height: 28px;
    }
    & .inputTitleArea {
        display: flex;
        width: 100%;
        padding-bottom: 21px;
        border-bottom: 2px solid #e1e2e3;
        font-size: 28px;
        font-weight: 400;
        line-height: 38px;
    }
    & .inputText {
        width: 100%;
        height: auto;
        padding: 0;
        border: 0;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        color: #333;
        outline: 0;
        resize: none;
        overflow: hidden;
    }
    & .paper {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 110px);
        padding: 60px 40px;
        border: 1px solid #e1e2e3;
        border-top: 0;
        background-color: #fff;
        max-width: 790px;
        margin: 0 auto;
    }
    position: relative;
    width: 100%;
    padding-top: 60px;
`;

const Header = styled.div`
    & .submit {
        isplay: flex;
        justify-content: center;
        align-items: center;
        width: 135px;
        height: 40px;
        & button {
            ackground-color: #f2f4f7;
            color: #ccc;
            width: 100%;
            height: 100%;
            font-size: 15px;

            justify-content: center;
            vertical-align: middle;
            min-width: 64px;
            padding: 0 27px;
            border-radius: 25px;
            font-weight: 700;
            line-height: normal;
            border: none;
        }
    }

    & .select {
        width: 290px;
        height: 100%;
        border: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding-right: 15px;
        padding-left: 15px;
        border-radius: 5px;
        background-color: #fff;
        font-size: 15px;
        & svg {
            position: absolute;
            top: 50%;
            right: 10px;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
        }
    }
    & select {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        padding-left: 15px;
        border: 0;
        appearance: none;
        background: transparent;
        cursor: pointer;
        border: 1px solid #e1e2e3;
        border-radius: 3px;
        color: #000;
    }
    & .content {
        display: flex;
        max-width: 1060px;
        margin: 0 auto;
        justify-content: space-between;
        height: 100%;
        padding: 10px 0;
    }
    position: fixed;
    top: 50px;
    z-index: 10;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border: 1px solid #e1e2e3;
`;

const Background = styled.div`
    position: absolute;
    width: 100%;
    z-index: 300;
    background-color: rgb(248, 248, 248);
    height: 100%;
`;

const InnerStyle = styled.form``;
