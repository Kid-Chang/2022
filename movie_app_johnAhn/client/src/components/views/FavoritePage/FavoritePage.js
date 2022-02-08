import { Button, Popover } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../../../config";

const FavoritePage = () => {
    const [Favorites, setFavorites] = useState([]);
    useEffect(() => {
        fetchFavortedMovie();
    }, []);
    const fetchFavortedMovie = () => {
        axios
            .post("/api/favorite/getFavoredMovie", {
                userFrom: localStorage.getItem("userId"),
            })
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.favorites);
                    setFavorites(res.data.favorites);
                } else {
                    window.alert("리스트 정보를 가져오는 것을 실패했습니다.");
                }
            });
    };

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom,
        };
        axios
            .post("/api/favorite/removeFromFavorite", variables)
            .then((res) => {
                if (res.data.success) {
                    console.log("removeFromFavorite", res.data);
                    fetchFavortedMovie();
                } else {
                    window.alert("리스트에서 지우기를 실패했습니다.");
                }
            });
    };

    const renderCards = Favorites.map((movie, idx) => {
        // console.log(movie);

        const content = (
            <div>
                {movie.moviePost ? (
                    <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} />
                ) : (
                    "no IMAGE"
                )}{" "}
            </div>
        );

        return (
            <tr key={idx}>
                <Popover content={content} title={movie.movieTitle}>
                    <td>{movie.movieTitle}</td>
                </Popover>
                <td>{movie.movieRunTime}</td>
                <td>
                    <Button
                        onClick={() =>
                            onClickDelete(movie.movieId, movie.userFrom)
                        }
                    >
                        Remove
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h2>Favorite Movies</h2>
            <hr />
            <Table>
                <thead>
                    <tr>
                        <th>Movie title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from Favorites</td>
                    </tr>
                </thead>
                <tbody>{renderCards}</tbody>
            </Table>
        </div>
    );
};

export default FavoritePage;

const Table = styled.div`
    border-collapse: collapse;
    width: 100%;

    & td,
    th {
        border: 1px solid #ddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even) {
        background-color: #ddd;
    }
`;
