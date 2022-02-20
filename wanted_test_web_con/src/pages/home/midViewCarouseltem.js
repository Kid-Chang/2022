import styled from "styled-components";
import { WantedPlus_data } from "./wantedPlus_data";
import { useEffect, useRef, useState } from "react";

const VodItemTemplate = ({ data }) => {
    return (
        <VodOuterBox>
            <ImgBoxStyle style={{ position: "relative" }}>
                <ImgStyle src={data.img} alt="" />
                <div>{data.time}</div>
            </ImgBoxStyle>
            <VodInnerText>
                <div style={{ display: "flex" }}>
                    {data.desc.map((data, idx) => {
                        return <DescItemStyle key={idx}>{data}</DescItemStyle>;
                    })}
                </div>
                {/* <div>{data.desc}</div> */}
                <div>{data.title}</div>
            </VodInnerText>
        </VodOuterBox>
    );
};
const DescItemStyle = styled.p`
    padding: 2px 4px 2px 4px;
    margin-right: 3px;
    border: 1px solid black;
    border-radius: 3px;
    height: 20px;
    font-size: 11px;
`;
const VodInnerText = styled.div`
    margin-top: 14px;
    & > div {
        font-size: 14px;
        height: 20px;
        font-weight: 600;
        color: #333;
    }
    & div + div {
        font-size: 16px;
        margin-top: 5px;
        font-weight: 700;
        color: #333;
    }
    & div + div + div {
        font-size: 13px;
        margin-top: 8px;
        font-weight: 600;
        color: #aaa;
    }
`;

const VodOuterBox = styled.div`
    padding: 0 10px 0 10px;
    height: 340px;
`;

const ImgBoxStyle = styled.div`
    width: 522px;
    position: relative;
    height: 273px;
`;

const ImgStyle = styled.img`
    border-radius: 5px;
    object-fit: cover;
    height: 273px;
    width: 100%;

    & + div {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        padding: 2px;
    }
`;

// 본체.
const MidViewCarousel = ({ nowX_carousel, setNowX_carousel, inputData }) => {
    const slickTrack = useRef();
    // console.log(RefCenterX.current.offsetLeft);
    const [usingData, setUsingData] = useState([]);

    useEffect(() => {
        setUsingData(inputData);
        setNowX_carousel(-10);
    }, []);

    useEffect(() => {
        slickTrack.current.style.transform = `translateX(${nowX_carousel}px)`;
        // console.log(nowX_carousel);
    }, [nowX_carousel]);

    return (
        <>
            <VodListOutBoxStyle>
                {/* mapping */}

                <VodListInBoxStyle ref={slickTrack}>
                    {usingData.map((data, idx) => {
                        return <VodItemTemplate data={data} key={idx} />;
                    })}
                </VodListInBoxStyle>
            </VodListOutBoxStyle>
        </>
    );
};

export default MidViewCarousel;

const VodListInBoxStyle = styled.div`
    display: flex;
    transition: transform 0.3s;
`;
const VodListOutBoxStyle = styled.div`
    display: flex;
    overflow-x: hidden;
    position: relative;
`;
