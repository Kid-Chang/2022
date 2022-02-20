import { PageWrap, TextMiddle } from "../components/common/styled";

const { useLocation } = require("react-router-dom");

const NoMatchPage = () => {
    let location = useLocation();

    return (
        <PageWrap style={{ backgroundColor: "#F8F8F8", height: "100vh" }}>
            <TextMiddle>
                <img
                    src="https://static.wanted.co.kr/images/error/lighthouse.png"
                    alt=""
                    width="400px"
                />
                <h3
                    style={{
                        color: "gray",
                        textAlign: "center",
                        marginTop: "50px",
                    }}
                >
                    PAGE NOT FOUND <br />
                    <code>{location.pathname}</code>
                </h3>
            </TextMiddle>
        </PageWrap>
    );
};

export default NoMatchPage;
