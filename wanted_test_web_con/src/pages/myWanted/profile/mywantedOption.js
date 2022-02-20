import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookmarkAndLike from "./bookNLike";
import Interests from "./interests";

const MyWantedOption = () => {
    const params = useParams();
    const optionKey = params.option;
    useEffect(() => console.log(optionKey), [optionKey]);
    const boxName =
        optionKey === "bookmarks"
            ? "북마크"
            : optionKey === "likes"
            ? "좋아요"
            : optionKey === "interests"
            ? "관심사 선택"
            : null;

    return (
        <Background>
            <Row
                className="justify-content-md-center"
                style={{ backgroundColor: "rgb(248,248,248)" }}
            >
                <Col style={{ maxWidth: "1090px", marginLeft: "30px" }}>
                    <OuterBox>
                        <h2>{boxName}</h2>
                        {(optionKey === "bookmarks" ||
                            optionKey === "likes") && (
                            <BookmarkAndLike optionKey={optionKey} />
                        )}
                        {optionKey === "interests" ? <Interests /> : null}
                    </OuterBox>
                </Col>
            </Row>
        </Background>
    );
};
export default MyWantedOption;

const Background = styled.div`
    position: absolute;
    width: 100%;
    z-index: 300;
    background-color: rgb(248, 248, 248);
    height: 100%;
`;

const OuterBox = styled.div`
    & h2 {
        font-size: 20px;
        font-weight: 700;
        color: #333;
        padding: 50px 0 20px;
    }
`;
