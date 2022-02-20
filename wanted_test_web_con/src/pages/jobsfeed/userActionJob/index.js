import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// 이거 복붙해서 내용 수정하면 아티클도 가능.
import { useSelector } from "react-redux";
import axios from "axios";
import { ServerSignURL } from "../..";
import MiniViewCarousel from "../miniViewCarousel";

const UserActionJob = () => {
    const [nowX_carousel, setNowX_carousel] = useState(0);
    const [leftBtn, setLeftBtn] = useState(true);
    const [rightBtn, setRightBtn] = useState(true);
    const XLimit = -1260;
    const LeftBtnRef = useRef();
    const RightBtnRef = useRef();
    const { userName, jwt, userIdx } = useSelector(
        (state) => state.LoginReducer,
    );
    const [itemsData, setItemsData] = useState([]);
    const getData = async () => {
        const data = await axios.get(
            `${ServerSignURL}/companies/positions-list/${userIdx}`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    limit: 12,
                },
            },
        );
        setItemsData(data.data.result);
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

    return (
        <OuterBoxStyle>
            <div>
                <SectionTitleStyle>
                    <div></div>
                    <TitleBoxStyle>
                        <div>{userName}님! 지금 바로 지원해볼까요?</div>
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
                <MiniViewCarousel
                    nowX_carousel={nowX_carousel}
                    setNowX_carousel={setNowX_carousel}
                    XLimit={XLimit}
                    dataList={itemsData}
                    getData={getData}
                />
            </div>
        </OuterBoxStyle>
    );
};
export default UserActionJob;

const OuterBoxStyle = styled.div`
    padding: 60px 0 60px 0;
    border-bottom: 1px solid #e4e4e5;
`;

const TitleBoxStyle = styled.div`
    text-align: center;
    & div {
        font-size: 22px;
        font-weight: 600;
    }
    & div + div {
        margin-top: 5px;
        font-size: 13px;
        color: #959595;
        font-weight: 500;
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
