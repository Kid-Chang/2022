import { useState } from "react";
import styled from "styled-components";

const OneLinkItem = ({ setAcademyList, academy }) => {
    // 인덱스id 불러와서 그걸 통해 저장하기.
    // console.log(academy);
    const [url, setUrl] = useState(""); // 지금은 공백이지만 값이 있다면 그거 불러오도록!

    const onChange = (e) => {
        // console.log(e.target);
        const {
            target: { name, value },
        } = e;

        if (name === "url") {
            setUrl(value);
        }
    };

    return (
        <li className="commonBox careers list-group-item">
            <EduStyle>
                <div className="link-item clearfix">
                    <div>
                        <input
                            className="resume-url-input"
                            type="text"
                            maxlength="300"
                            placeholder="http://"
                            name="url"
                            value={url}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="BtnDelete_BtnDelete__eEe1N btn-delete"
                    >
                        <i className="icon-close"></i>
                    </button>
                </div>
            </EduStyle>
        </li>
    );
};

export default OneLinkItem;

const EduStyle = styled.div``;
