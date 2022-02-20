import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const JobPosting = () => {
    const navigate = useNavigate();

    return (
        <OuterBox>
            <div
                onClick={() => {
                    navigate("/wdlist");
                }}
                style={{ cursor: "pointer" }}
            >
                <div
                    style={{
                        backgroundColor: "#f2f5ff",
                        borderRadius: "40px 0 0 40px",
                    }}
                >
                    <Link to="/wdlist">
                        <svg
                            className="SvgIcon_SvgIcon__root__svg__DKYBi"
                            viewBox="0 0 32 32"
                            style={{
                                width: "32px",
                                marginBottom: "6px",
                            }}
                        >
                            <path d="M27.96 29.374a1 1 0 1 0 1.414-1.414l-8.667-8.667-.338-.294a1 1 0 0 0-1.357.05 9 9 0 1 1 2.24-3.676 1 1 0 1 0 1.909.6 11.01 11.01 0 0 0 .506-3.306c0-6.076-4.925-11-11-11-6.076 0-11 4.924-11 11 0 6.074 4.925 11 11 11 2.615 0 5.087-.918 7.04-2.549l8.253 8.256z"></path>
                        </svg>
                        채용공고
                    </Link>
                </div>
            </div>
            <div>
                <div style={{ backgroundColor: "#f3f9fd" }}>
                    <Link to="/mywanted">
                        <svg
                            className="SvgIcon_SvgIcon__root__svg__DKYBi"
                            viewBox="0 0 32 32"
                            style={{ width: "32px", marginBottom: "6px" }}
                        >
                            <path d="M18.812 14.36c-.722.917-1.172 1.905-1.188 2.959-.023 1.658.907 2.901 2.613 3.605l.132.044c3.985 1.027 6.615 3.38 6.615 5.748L27 28.118c0 .03-.222.215-.4.215H5.33c-.157 0-.314-.14-.314-.203L5 26.705c0-2.283 2.384-4.493 6.185-5.564.349-.079.896-.273 1.458-.616.885-.54 1.504-1.297 1.654-2.301a1 1 0 1 0-1.978-.296c-.05.333-.293.63-.719.89-.345.21-.703.338-.909.385C6.075 20.503 3 23.353 3 26.716l.016 1.426c0 1.214 1.103 2.191 2.313 2.191h21.272c1.213-.002 2.399-.995 2.399-2.226l-.016-1.403c0-3.432-3.313-6.414-8.044-7.654-.944-.404-1.327-.932-1.316-1.702.008-.541.284-1.147.76-1.75.31-.394.622-.691.81-.84l.1-.092c1.409-1.474 2.319-3.428 2.319-5.333 0-4.169-3.488-7.666-7.648-7.666-4.158 0-7.647 3.498-7.647 7.666 0 1.795.506 3.33 1.55 4.628a1 1 0 1 0 1.558-1.255c-.748-.93-1.108-2.02-1.108-3.373 0-3.065 2.595-5.666 5.647-5.666 3.054 0 5.648 2.6 5.648 5.666 0 1.329-.67 2.786-1.722 3.906a7.46 7.46 0 0 0-1.079 1.122z"></path>
                        </svg>
                        내 프로필
                    </Link>
                </div>
            </div>
            <div>
                <div style={{ backgroundColor: "#edfaf9" }}>
                    <svg
                        className="SvgIcon_SvgIcon__root__svg__DKYBi"
                        viewBox="0 0 32 32"
                        style={{ width: "32px", marginBottom: "6px" }}
                    >
                        <path d="M11.667 28.667a1 1 0 0 1-1-1v-7h-2v7a1 1 0 0 1-1 1H2.333a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1H17a1 1 0 0 1 1 1v4.333h11a1 1 0 0 1 .993.884l.007.116v12a1 1 0 1 1-2 0v-11H18v15.334h11a1 1 0 1 1 0 2H11.667zM16 6H3.333v20.667h3.334v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7H16V6zm5 12.333c.736 0 1.333.597 1.333 1.334V21a1.333 1.333 0 1 1-2.666 0v-1.333c0-.737.597-1.334 1.333-1.334zM21 13c.736 0 1.333.597 1.333 1.333v1.334a1.333 1.333 0 1 1-2.666 0v-1.334c0-.736.597-1.333 1.333-1.333zM8 13a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.667a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1H8zm0-5.333a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.667a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1H8z"></path>
                    </svg>
                    매치업
                </div>
            </div>
            <div>
                <div
                    style={{
                        backgroundColor: "#f2fbf4",
                        borderRadius: "0 40px 40px 0",
                    }}
                >
                    <Link to="/salary">
                        <svg
                            className="SvgIcon_SvgIcon__root__svg__DKYBi"
                            viewBox="0 0 32 32"
                            style={{ width: "32px", marginBottom: "6px" }}
                        >
                            <path d="M10.667 21.667a3.67 3.67 0 0 1 3.528 2.666H28a1 1 0 0 1 0 2l-13.805.001a3.67 3.67 0 0 1-7.057 0H4a1 1 0 1 1 0-2h3.138a3.67 3.67 0 0 1 3.529-2.667zm0 2a1.668 1.668 0 0 0 0 3.333 1.668 1.668 0 0 0 0-3.333zm10.666-11.334A3.67 3.67 0 0 1 24.862 15H28a1 1 0 0 1 0 2h-3.138a3.67 3.67 0 0 1-7.057 0H4a1 1 0 0 1 0-2h13.805a3.67 3.67 0 0 1 3.528-2.667zm0 2a1.668 1.668 0 0 0 0 3.334 1.668 1.668 0 0 0 0-3.334zM10.667 3a3.67 3.67 0 0 1 3.528 2.666H28a1 1 0 0 1 0 2H14.195a3.67 3.67 0 0 1-7.057 0H4a1 1 0 1 1 0-2h3.138A3.67 3.67 0 0 1 10.667 3zm0 2a1.668 1.668 0 0 0 0 3.333 1.668 1.668 0 0 0 0-3.333z"></path>
                        </svg>
                        직군별 연봉
                    </Link>
                </div>
            </div>
        </OuterBox>
    );
};

export default JobPosting;

const OuterBox = styled.div`
    display: flex;
    justify-content: center;
    height: 80px;
    & a {
        color: black;
    }
    & div {
        width: 264px;
        height: 100%;
        margin: 0 1px 0 1px;
    }
    & div div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
