import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Favorite = ({ movieInfo, movieId, userFrom }) => {
    const movieTitle = movieInfo.title;
    const moviePost = movieInfo.backdrop_path;
    const movieRunTime = movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime,
    };
    useEffect(() => {
        console.log("movieInfo", movieInfo);
        console.log(variables);
        axios.post("/api/favorite/favoriteNumber", variables).then((res) => {
            if (res.data.success) {
                // console.log(res.data);
                setFavoriteNumber(res.data.favoriteNumber);
            } else {
                alert("숫자 정보를 가져오는데 실패함.");
            }
        });

        axios.post("/api/favorite/favorited", variables).then((res) => {
            if (res.data.success) {
                // console.log("favorited", res.data);
                setFavorited(res.data.favorited);
            } else {
                alert("정보를 가져오는데 실패함.");
            }
        });
    }, []);

    const onClickFavorite = () => {
        if (Favorited) {
            axios
                .post("/api/favorite/removeFromFavorite", variables)
                .then((res) => {
                    if (res.data.success) {
                        console.log("removeFromFavorite", res.data);
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        window.alert("리스트에서 지우기를 실패했습니다.");
                    }
                });
        } else {
            axios.post("/api/favorite/addToFavorite", variables).then((res) => {
                if (res.data.success) {
                    console.log("addToFavorite", res.data);
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                } else {
                    window.alert("리스트에 추가하기를 실패했습니다.");
                }
            });
        }
    };

    return (
        <>
            <Button onClick={onClickFavorite}>
                {Favorited ? "Not Favorite" : "Add to Favorite "}
                {FavoriteNumber}
            </Button>
        </>
    );
};

export default Favorite;
