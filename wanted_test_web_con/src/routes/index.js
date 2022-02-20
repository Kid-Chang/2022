import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/common/header";
import HomePage from "../pages/home";
import Footer from "../components/common/footer";
import JobsFeedPage from "../pages/jobsfeed";
import EventsPage from "../pages/events";
import SalaryPage from "../pages/salary";
import ResumeIntroPage from "../pages/resume";
import CommunityPage from "../pages/community";
import AiScorePage from "../pages/aiscore";
import NoMatchPage from "../pages/noMatch";
import { useSelector } from "react-redux";
import ResumePage from "../pages/resume/ResumeMain";
import MyWanted from "../pages/myWanted/mywanted";
import WdList from "../pages/jobsfeed/wdList/wdList";
import WdItem from "../pages/jobsfeed/wdList/wdItem";
import { useState } from "react";
import CompanyItem from "../pages/jobsfeed/company";
import SearchPage from "../pages/search";
import CRUDResume from "../pages/resume/CRUD_Resume/CRUDResume";
import MyWantedOption from "../pages/myWanted/profile/mywantedOption";
import OnePostPage from "../pages/community/onePost";
import WriteCommentPage from "../pages/community/writeComment";
import EditCommentPage from "../pages/community/editComment";
import ApplicationStatusPage from "../pages/myWanted/status";

const RootRoute = () => {
    const { isLogin } = useSelector((state) => state.LoginReducer);
    // console.log(isLogin);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* 기본 루트페이지 */}
                <Route path="/" element={<HomePage />} key="index" />

                {/* 추가되는 페이지 */}
                <Route
                    path="/jobsfeed"
                    element={<JobsFeedPage />}
                    key="jobsfeed"
                />
                <Route path="/events" element={<EventsPage />} key="events" />
                <Route path="/salary" element={<SalaryPage />} key="salary" />

                <Route
                    path="/cv/intro"
                    element={<ResumeIntroPage />}
                    key="userList"
                />

                <Route
                    path="/cv/list"
                    element={<ResumePage />}
                    key="listIntro"
                />
                <Route
                    path="/cv/:id"
                    element={<CRUDResume />}
                    key="CRUDResume"
                />

                <Route
                    path="/community"
                    element={<CommunityPage />}
                    key="community"
                />
                <Route
                    path="/community/post/:id"
                    element={<OnePostPage />}
                    key="community_post"
                />
                <Route
                    path="/community/write"
                    element={<WriteCommentPage />}
                    key="community_post_write"
                />
                <Route
                    path="/community/edit/:id"
                    element={<EditCommentPage />}
                    key="community_post_edit"
                />

                <Route
                    path="/aiscore/resume"
                    element={<AiScorePage />}
                    key="aiScore"
                />
                <Route path="/wdlist" element={<WdList />} key="wdList" />
                <Route path="/wdlist/:tag" element={<WdList />} key="wdList" />
                <Route path="/wd/:id" element={<WdItem />} key="wdList" />
                <Route
                    path="/company/:id"
                    element={<CompanyItem />}
                    key="CompanyList"
                />
                <Route path="/search" element={<SearchPage />} key="search" />

                <Route path="/mywanted" element={<MyWanted />} key="myWanted" />
                <Route
                    path="/profile/:option"
                    element={<MyWantedOption />}
                    key="profile_option"
                />
                <Route
                    path="/status/applications"
                    element={<ApplicationStatusPage />}
                    key="applications_status"
                />

                {/* 경로가 유효하지 않을 때 */}
                <Route path="/*" element={<NoMatchPage />} key="noMatch" />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default RootRoute;
