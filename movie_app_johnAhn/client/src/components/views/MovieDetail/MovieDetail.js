import { Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, IMAGE_BASE_URL } from "../../../config";
import GridCards from "../commons/GridCards";
import MainImage from "../Landingpage/MainImage";
import Favorite from "./Sections/Favorite";

const MovieDetail = (props) => {
    const param = useParams();

    const movieId = param.movieId;
    // console.log(movieId);
    const [Receive, setReceive] = useState(false);
    const [Movie, setMovie] = useState({});
    const [Crew, setCrew] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko`;

        const endPointInfo = `${API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko`;

        axios.get(endPointInfo).then((res) => {
            // console.log(res.data);
            setMovie(res.data);
            setReceive(true);
        });
        axios.get(endPointCrew).then((res) => {
            // console.log(res.data.cast);
            setCrew(res.data.cast);
        });
    }, []);

    return (
        <>
            {Receive && (
                <div>
                    {/* header */}
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280/${Movie.backdrop_path}`}
                        MainMovie={Movie}
                    />
                    {/* body */}

                    <div style={{ width: "85%", margin: "1rem auto" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <>
                                {/* {console.log("Movie", Movie)} */}
                                <Favorite
                                    movieInfo={Movie}
                                    movieId={movieId}
                                    userFrom={localStorage.getItem("userId")}
                                />
                            </>
                        </div>
                        {/* movie info */}

                        <br />
                        {/* <actors Grid */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "2rem",
                            }}
                        >
                            <button
                                onClick={() => setActorToggle(!ActorToggle)}
                            >
                                Toggle Actor View
                            </button>
                        </div>
                        {ActorToggle && (
                            <Row gutter={[16, 16]}>
                                {Crew &&
                                    Crew.map((movie, idx) => {
                                        // console.log(movie);
                                        return (
                                            <React.Fragment key={idx}>
                                                <GridCards
                                                    image={
                                                        movie.profile_path
                                                            ? `${IMAGE_BASE_URL}w500${movie.profile_path}`
                                                            : null
                                                    }
                                                    characterName={movie.name}
                                                />
                                            </React.Fragment>
                                        );
                                    })}
                            </Row>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieDetail;
