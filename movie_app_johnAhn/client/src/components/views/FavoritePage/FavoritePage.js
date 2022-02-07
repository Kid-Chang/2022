import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FavoritePage = () => {
    const [Favorites, setFavorites] = useState([]);
    useEffect(() => {
        axios
            .post("/api/favorite/getFavoredMovie", {
                userFrom: localStorage.getItem("userId"),
            })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.favorites);
                    setFavorites(res.data.favorites);
                } else {
                    window.alert("리스트 정보를 가져오는 것을 실패했습니다.");
                }
            });
    }, []);

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
                <tbody>
                    {Favorites.map((movie, idx) => {
                        console.log(movie);
                        return (
                            <tr key={idx}>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.movieRunTime}</td>
                                <td>
                                    <Button>Remove</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
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
