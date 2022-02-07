import React from "react";

const MainImage = ({ image, MainMovie }) => {
    // console.log(image);
    return (
        <div>
            <div
                style={{
                    background: `url(${image})`,
                    height: "500px",
                    backgroundSize: "100%, cover",
                    backgroundPosition: "center, center",
                    width: "100%",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        maxWidth: "500px",
                        bottom: "2rem",
                        marginLeft: "2rem",
                    }}
                >
                    <h2 style={{ color: "white" }}>{MainMovie.title}</h2>
                    <p style={{ color: "white", fontSize: "1rem" }}>
                        {MainMovie.overview}
                    </p>
                    <div>hello</div>
                </div>
            </div>
        </div>
    );
};

export default MainImage;
