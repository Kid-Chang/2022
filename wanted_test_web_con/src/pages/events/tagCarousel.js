import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TagListData } from "./taglist_data";

const CarouselItem = ({ data: { tag }, onTagClick, pickTag }) => {
    return (
        <>
            {tag === pickTag ? (
                <ContentOutboxSytle
                    style={{
                        backgroundColor: "white",
                        border: "1px solid #666",
                    }}
                >
                    <Link
                        to=""
                        style={{ color: "#333" }}
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </Link>
                </ContentOutboxSytle>
            ) : (
                <ContentOutboxSytle>
                    <Link
                        to=""
                        style={{ color: "#333" }}
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </Link>
                </ContentOutboxSytle>
            )}
        </>
    );
};

const TagCarousel = ({ onTagClick, pickTag }) => {
    const [nowX_carousel, setNowX_carousel] = useState(10);
    const slickTrack = useRef();

    useEffect(() => {
        slickTrack.current.style.transform = `translateX(${nowX_carousel}px)`;
        //     // console.log(nowX_carousel);
    }, [nowX_carousel]);
    return (
        <DivOuterBox>
            <CarouselButtonSytle
                style={{
                    left: `-20px`,
                }}
                onClick={() => {
                    nowX_carousel < 0
                        ? setNowX_carousel(nowX_carousel + 300)
                        : setNowX_carousel(nowX_carousel);
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </CarouselButtonSytle>
            <CarouselButtonSytle
                style={{
                    right: `-50px`,
                }}
                onClick={() => {
                    setNowX_carousel(nowX_carousel - 300);
                }}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </CarouselButtonSytle>
            <CarouselOutBox>
                <CarouselInBox ref={slickTrack}>
                    {TagListData.map((data, idx) => (
                        <CarouselItem
                            data={data}
                            onTagClick={onTagClick}
                            key={idx}
                            pickTag={pickTag}
                        />
                    ))}
                </CarouselInBox>
            </CarouselOutBox>
        </DivOuterBox>
    );
};

export default TagCarousel;
const DivOuterBox = styled.div` 
    position: relative;
    display: flex;
    align-Items: center;
}}
`;
const CarouselInBox = styled.div`
    display: flex;
    transition: transform 0.5s;
    position: relative;
    width: 200vw;
`;

const ContentOutboxSytle = styled.div`
    margin-right: 10px;
    position: relative;
    height: 50px;
    background-color: #f2f4f7;
    padding: 0 28px 0 28px;
    display: flex;
    align-items: center;
    border-radius: 5px;
`;

const CarouselButtonSytle = styled.div`
    position: absolute;

    z-index: 200;
    width: 44px;
    height: 44px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid #e4e4e5;
`;

const CarouselOutBox = styled.div`
    position: relative;
    margin-left: 20px;
    width: 900px;
    // height: 136px;
    overflow-x: hidden;
`;
