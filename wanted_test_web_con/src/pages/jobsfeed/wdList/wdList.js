import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { wdJob_data } from "./wdList_data";
import { wdList_data } from "./wdlistTag";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { ServerSignURL } from "../..";
import { useSelector } from "react-redux";
import ItemLayout from "./itemLayout";

const WdList = () => {
    //무한스크롤
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
    const [pickTag, setPickTag] = useState("전체");

    const [positionList, setPositionList] = useState([]);

    // useEffect(() => {
    //     console.log(itemLists);
    // }, [itemLists]);
    let limitCount = 8;
    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);

    const refreshItem = async (propLimitCount) => {
        const URL = `${ServerSignURL}/companies/positions-list/${userIdx}`;
        // console.log(URL);
        let paramsData;
        if (pickTag !== "전체") {
            paramsData = {
                limit: `${limitCount}`,
                largeCategory: `${pickTag}`,
            };
        } else {
            paramsData = {
                limit: `${limitCount}`,
            };
        }
        console.log(paramsData);
        const data = await axios.get(URL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: paramsData,
        });

        let Items = data.data.result;
        const sortItem = Items.sort(function (a, b) {
            return a.positionIdx - b.positionIdx;
        });
        setPositionList(sortItem);
    };

    const getMoreItem = async () => {
        setIsLoaded(true);
        console.log(pickTag);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const URL = `${ServerSignURL}/companies/positions-list/${userIdx}`;
        // console.log(newTag);
        let paramsData;
        if (pickTag !== "전체") {
            paramsData = {
                limit: `${limitCount}`,
                largeCategory: `${pickTag}`,
            };
        } else {
            paramsData = {
                limit: `${limitCount}`,
            };
        }
        console.log(paramsData);
        const data = await axios.get(URL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: paramsData,
        });
        // params: {
        //     limit: `${limitCount}`,
        //     largeCategory: `${newTag}`,
        // },

        // console.log(data);
        limitCount = limitCount + 2;

        let Items = data.data.result;
        const sortItem = Items.sort(function (a, b) {
            return a.positionIdx - b.positionIdx;
        });

        setPositionList(sortItem);
        // console.log(sortItem);
        // console.log(limitCount);

        // 내생각에는 여기에 쿼리 값이 유동적으로 변하는 axios를 넣어서 갯수만큼 호출되도록 하면 좋을듯.
        // let Items = [1, 1, 1, 1];
        // setItemLists((itemLists) => itemLists.concat(Items));

        setIsLoaded(false);
    };
    // useEffect(() => {
    //     console.log(positionList);
    // }, [positionList]);

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await getMoreItem();
            observer.observe(entry.target);
            // 여기에 추가?
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
    const navigation = useNavigate();
    const onTagClick = (data) => {
        // console.log(data);
        limitCount = 0;
        setPickTag(data);
        getMoreItem();
        // /companies/tag-serch
        // navigation(`/companies/${data}`);
    };

    const [likeChange, setLikeChange] = useState([]);
    return (
        <div>
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
                        {pickTag}
                        <CategoryListBox>
                            {wdList_data.map((data, idx) => {
                                return (
                                    <div key={idx}>
                                        <input
                                            type="radio"
                                            id={data}
                                            name="categoryTag"
                                            onClick={() => onTagClick(data)}
                                        />
                                        <label htmlFor={data}>{data}</label>
                                    </div>
                                );
                            })}
                        </CategoryListBox>

                        {/* <SelectList>
                            <div>태그</div>
                            <div>지역</div>
                            <div>경력</div>
                            <div>응답률순</div>
                        </SelectList> */}
                    </div>

                    <div>
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
        </div>
    );
};

export default WdList;

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
