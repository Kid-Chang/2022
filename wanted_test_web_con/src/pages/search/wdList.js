import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import ItemLayout from "./itemLayout";
import { ServerSignURL } from "..";

const WdListSearch = () => {
    //무한스크롤
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([1, 1, 1, 1, 1, 1, 1, 1]);

    const [positionList, setPositionList] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("query");

    // useEffect(() => {
    //     console.log(itemLists);
    // }, [itemLists]);
    let limitCount = 8;
    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);

    const refreshItem = async (propLimitCount) => {
        // console.log(URL);
        const data = await axios.get(
            `${ServerSignURL}/companies/search/${userIdx}`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: { query: search, limit: 6 },
            },
        );

        let Items = data.data.result.positions;
        console.log(Items);
        setPositionList(Items);
    };

    const getMoreItem = async () => {
        setIsLoaded(true);
        // console.log(limitCount);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const data = await axios.get(
            `${ServerSignURL}/companies/search/${userIdx}`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: { query: search, limit: 6 },
            },
        );
        limitCount = limitCount + 2;

        let Items = data.data.result.positions;
        console.log(Items);
        setPositionList(Items);
        setIsLoaded(false);
    };

    useEffect(() => {
        getMoreItem();
    }, [searchParams]);
    // useEffect(() => {
    //     console.log(positionList);
    // }, [positionList]);

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await getMoreItem();
            observer.observe(entry.target);
        }
    };

    // api 호출

    // useEffect(() => getPosition(), []);

    useEffect(() => {
        let observer;
        if (target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0.4,
            });
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);
    //무한스크롤 끝
    const [pickTag, setPickTag] = useState("전체");
    const navigation = useNavigate();
    const onTagClick = (data) => {
        console.log(data);
        setPickTag(data);
        // /companies/tag-serch
        // navigation(`/companies/${data}`);
    };

    const [likeChange, setLikeChange] = useState([]);
    return (
        <div>
            {positionList ? (
                <Row className="justify-content-md-center">
                    <Col style={{ maxWidth: "1090px" }}>
                        <div
                            style={{
                                padding: "40px 0 15px 0 ",
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#333",
                            }}
                        >
                            {/* <SelectList>
                                <div>태그</div>
                                <div>지역</div>
                                <div>경력</div>
                                <div>응답률순</div>
                            </SelectList> */}
                        </div>

                        <div>
                            <ContainerOuterBox>
                                {positionList &&
                                    positionList.map((position, index) => {
                                        return (
                                            <ItemLayout
                                                key={index}
                                                positionIdx={
                                                    position.positionIdx
                                                }
                                                imgUrl={position.image}
                                                title={position.title}
                                                companyName={
                                                    position.companyName
                                                }
                                                region={position.region}
                                                nation={position.nation}
                                                reward={position.reward}
                                                responceLevel={
                                                    position.responseLevel
                                                }
                                                likeNum={position.likeNum}
                                                likeStatus={position.likeStatus}
                                                setLikeChange={setLikeChange}
                                                refreshItem={refreshItem}
                                                limitCount={limitCount}
                                            />
                                        );
                                    })}
                                <div ref={setTarget} className="Target-Element">
                                    {/* {isLoaded && <Loader />} */}
                                </div>
                            </ContainerOuterBox>
                        </div>
                    </Col>
                </Row>
            ) : null}
        </div>
    );
};

export default WdListSearch;

const ContainerOuterBox = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SelectList = styled.div`
    display: flex;
    font-size: 10px;
`;

const CategoryListBox = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e2e3;
    display: flex;
    flex-wrap: wrap;

    & label {
        padding: 5px 35px 5px 0;
        text-align: center;
        font-weight: 400;
        font-size: 13px;
    }
    & input:checked + label {
        color: blue;
    }
    & input {
        display: none;
    }
`;
