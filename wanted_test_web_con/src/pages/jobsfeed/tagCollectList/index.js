import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import axios from "axios";
import { ServerSignURL } from "../..";
import MidViewCarousel from "../midViewCarouseltem copy";
// 이거 복붙해서 내용 수정하면 아티클도 가능.

const TagCollectList = ({ PickedTag, idx }) => {
    console.log(PickedTag, idx);

    const [nowX_carousel, setNowX_carousel] = useState(0);
    const [leftBtn, setLeftBtn] = useState(true);
    const [rightBtn, setRightBtn] = useState(true);
    const XLimit = -1260;
    const LeftBtnRef = useRef();
    const RightBtnRef = useRef();
    const { jwt, userIdx } = useSelector((state) => state.LoginReducer);
    const [itemsData, setItemsData] = useState([]);

    const URL = `${ServerSignURL}/companies/tag-search/${userIdx}`;
    const getData = async () => {
        // 채용조회가 아닌 태그에 맞춘 회사 조회로 수정;
        const data = await axios.get(URL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
            params: {
                tag: `${PickedTag}`,
                limit: `12`,
            },
        });
        console.log("here", URL);
        setItemsData(data.data.result);
        console.log(data.data);
    };
    useEffect(() => getData(), []);

    useEffect(() => {
        if (nowX_carousel === -10) {
            setLeftBtn(false);
            LeftBtnRef.current.style =
                "left:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#f1f1f1;";
        } else {
            setLeftBtn(true);
            LeftBtnRef.current.style =
                "left:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #e4e4e5; color:#959595; &: hover {border: 2px solid #959595;}";
        }
        //왼, 오
        if (nowX_carousel < XLimit) {
            setRightBtn(false);
            RightBtnRef.current.style =
                "right:10px;  z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#f1f1f1;";
        } else {
            setRightBtn(true);
            RightBtnRef.current.style =
                "right:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #e4e4e5; color:#959595; &: hover {border: 2px solid #959595;}";
        }
    }, [nowX_carousel]);

    // 캐러셀 조작 키 설정.
    const onLeftButtonHover = () => {
        if (leftBtn) {
            LeftBtnRef.current.style =
                "left:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #959595; color:#959595;";
        } else {
            LeftBtnRef.current.style =
                "left:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#f1f1f1;";
        }
    };
    const onLeftButtonLeave = () => {
        if (leftBtn) {
            LeftBtnRef.current.style =
                "left:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#959595;";
        } else {
            LeftBtnRef.current.style =
                "left:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#f1f1f1;";
        }
    };
    const onRightButtonHover = () => {
        if (rightBtn) {
            RightBtnRef.current.style =
                "right:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #959595; color:#959595;";
        } else {
            RightBtnRef.current.style =
                "right:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#f1f1f1;";
        }
    };
    const onRightButtonLeave = () => {
        if (rightBtn) {
            RightBtnRef.current.style =
                "right:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#959595;";
        } else {
            RightBtnRef.current.style =
                "right:10px; position: absolute; z-index: 400; width: 36px; height: 36px; background-color: white; display: flex; justify-content: center; align-items: center;border-radius: 20px;background-color: rgba(255, 255, 255, 0.5); border: 2px solid #f1f1f1; color:#f1f1f1;";
        }
    };
    // WantedPlus_data.map((data) => {
    //     console.log(data);
    // });
    return (
        <>
            {itemsData ? (
                <OuterBoxStyle>
                    <div>
                        <SectionTitleStyle>
                            <div></div>
                            <TitleBoxStyle>
                                <h2>
                                    #{PickedTag} &nbsp;
                                    <span>
                                        관심 가질만한 회사들을 모아봤어요
                                    </span>
                                </h2>
                            </TitleBoxStyle>
                            <div></div>
                            <CarouselButtonSytle
                                onMouseEnter={onLeftButtonHover}
                                onMouseLeave={onLeftButtonLeave}
                                ref={LeftBtnRef}
                                onClick={() => {
                                    nowX_carousel < -15
                                        ? setNowX_carousel(nowX_carousel + 1080)
                                        : setNowX_carousel(nowX_carousel);
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </CarouselButtonSytle>
                            <CarouselButtonSytle
                                onMouseEnter={onRightButtonHover}
                                onMouseLeave={onRightButtonLeave}
                                ref={RightBtnRef}
                                style={{
                                    right: `10px`,
                                }}
                                onClick={() => {
                                    nowX_carousel > XLimit
                                        ? setNowX_carousel(nowX_carousel - 1080)
                                        : setNowX_carousel(nowX_carousel);
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </CarouselButtonSytle>
                        </SectionTitleStyle>
                    </div>
                    <div style={{ overflowY: "visible" }}>
                        <MidViewCarousel
                            nowX_carousel={nowX_carousel}
                            setNowX_carousel={setNowX_carousel}
                            XLimit={XLimit}
                            inputData={itemsData}
                            getData={getData}
                        />
                    </div>
                </OuterBoxStyle>
            ) : null}
        </>
    );
};
export default TagCollectList;

const OuterBoxStyle = styled.div`
    padding: 60px 0 60px 0;
`;

const TitleBoxStyle = styled.div`
    text-align: center;
    & h2 {
        align-items: center;
        font-size: 22px;
        font-weight: 600;
        line-height: 1.05;
        color: #333;
    }
    & span {
        font-weight: 400;
    }
`;

const CarouselButtonSytle = styled.div`
    position: absolute;
    // top: -40px;
    z-index: 400;
    width: 36px;
    height: 36px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid #e4e4e5;
    &: hover {
        border: 2px solid #959595;
    }
`;

const SectionTitleStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
`;
