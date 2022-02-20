// bookmarks or likes

import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ServerSignURL } from "../..";
import ItemLayout from "./itemLayout";

const BookmarkAndLike = ({ optionKey }) => {
    const [likeChange, setLikeChange] = useState([]);
    const [data, setData] = useState([]);
    const { userIdx, jwt } = useSelector((state) => state.LoginReducer);
    let limitCount = 8;
    useEffect(() => getData(), [optionKey]);

    const getData = async () => {
        const UURL = `${ServerSignURL}/users/${userIdx}/${optionKey}`;
        console.log(UURL);
        const data = await axios.get(UURL, {
            headers: {
                "X-ACCESS-TOKEN": jwt,
            },
        });
        setData(data.data.result);
        console.log(data.data.result);
    };

    const refreshItem = async (propLimitCount) => {
        // console.log(URL);
        const data = await axios.get(
            `${ServerSignURL}/users/${userIdx}/${optionKey}`,
            {
                headers: {
                    "X-ACCESS-TOKEN": jwt,
                },
                params: {
                    limit: `${propLimitCount}`,
                },
            },
        );

        setData(data.data.result);
        console.log(data.data.result);
    };

    useEffect(() => getData(), []);

    return (
        <div>
            {data &&
                data.map((position, index) => {
                    return (
                        <ItemLayout
                            key={index}
                            positionIdx={position.positionIdx}
                            imgUrl={position.image}
                            title={position.positionName}
                            companyName={position.companyName}
                            region={position.region}
                            nation={position.nation}
                            reward={position.reward}
                            responceLevel={position.responseLevel}
                            likeNum={position.likeNum}
                            likeStatus={position.status}
                            optionKey={optionKey}
                            setLikeChange={setLikeChange}
                            refreshItem={refreshItem}
                            limitCount={limitCount}
                        />
                    );
                })}
        </div>
    );
};

// companyName: "씨제이올리브영(CJ올리브영)"
// image: "https://imagesm.cj.net/images/brand/oliveyoung/img_cont2.jpg"
// likeNum: 0
// nation: "한국"
// positionIdx: 1
// positionName: "데이터 사이언티스트 (Data Scientist)"
// region: null
// reward: 1000000
// status: "true"

export default BookmarkAndLike;
