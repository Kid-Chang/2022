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

const FeaturedJob = () => {
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
                    limit: `4`,
                },
            },
        );
        setItemsData(data.data.result);
    };
    useEffect(() => getData(), []);

    return (
        <OuterBoxStyle>
            <div>
                <SectionTitleStyle>
                    <div></div>
                    <TitleBoxStyle>
                        <div>요즘 뜨는 포지션</div>
                    </TitleBoxStyle>
                    <div></div>
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
export default FeaturedJob;

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

const SectionTitleStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
`;
