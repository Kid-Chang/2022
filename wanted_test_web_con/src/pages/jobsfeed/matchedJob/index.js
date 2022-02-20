import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import MiniViewCarousel from "../miniViewCarousel";
import { ServerSignURL } from "../..";
// 이거 복붙해서 내용 수정하면 아티클도 가능.

const MatchedJobList = () => {
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
                    limit: `${12}`,
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
    // WantedPlus_data.map((data) => {
    //     console.log(data);
    // });
    return (
        <OuterBoxStyle>
            <div>
                <SectionTitleStyle>
                    <div></div>
                    <TitleBoxStyle>
                        <div>
                            wanted ai 가 제안하는 합격률 높은 포지션
                            <button>
                                <svg width="24" height="24" viewBox="0 0 17 17">
                                    <defs>
                                        <filter id="bfoh3u0w3a">
                                            <feColorMatrix
                                                in="SourceGraphic"
                                                values="0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 1.000000 0"
                                            ></feColorMatrix>
                                        </filter>
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                        <g>
                                            <g>
                                                <g transform="translate(-1080 -374) translate(1080 374)">
                                                    <g>
                                                        <path
                                                            stroke="#999"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.2"
                                                            d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745"
                                                            transform="translate(1 1)"
                                                        ></path>
                                                        <path
                                                            fill="#999"
                                                            d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671"
                                                            transform="translate(1 1) rotate(-180 7.053 10.408)"
                                                        ></path>
                                                        <path
                                                            stroke="#999"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.2"
                                                            d="M5.04 5.655c0-1.08.901-1.958 2.013-1.958 1.11 0 2.013.877 2.013 1.958 0 1.08-1.007 1.957-2.013 1.957v.783"
                                                            transform="translate(1 1)"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <Link to={"/wdlist"}> 포지션 전체보기{" >"}</Link>
                        </div>
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
export default MatchedJobList;

const OuterBoxStyle = styled.div`
    padding: 60px 0 60px 0;
    border-bottom: 1px solid #e4e4e5;
`;

const TitleBoxStyle = styled.div`
    & a {
        color: #767676;
        font-size: 15px;
    }
    text-align: center;
    & div {
        font-size: 22px;
        font-weight: 600;
    }
    & > div > button {
        background-color: white;
        border: 0;
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
