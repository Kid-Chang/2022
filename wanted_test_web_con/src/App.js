import Footer from "./components/common/footer.js";
import Header from "./components/common/header.js";
import RootRoute from "./routes/index.js";

//컴포넌트
/// 여기서 자동 로그인 구현해야 할듯.
const App = () => {
    return (
        <>
            <RootRoute />
        </>
    );
};

export default App;
