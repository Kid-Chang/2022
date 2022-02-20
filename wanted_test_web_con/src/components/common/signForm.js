import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ServerSignURL } from "../../pages";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/actions/login";
import LoginReducer from "../../store/reducers/login";

const SignForm = ({
    showSignForm,
    onSignClick,
    signUpCase,
    setSignUpCase,
    signInCase,
    setSignInCase,
    serverErrMsg,
    setServerErrMsg,
    getUserInfo,
}) => {
    // 서버와 통신해서 회원가입해야할 경우면 signUpCase 이용.
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [term, setTerm] = useState(true); // 요거 조정해야함. 이게 체크박스 전체 동의 말하는겨
    const [passwordError, setPasswordError] = useState(false);

    const [agreeClause, setAgreeClause] = useState(false);
    const [agreeAd, setAgreeAd] = useState(false);

    const dispatch = useDispatch();

    const [agreeClauseError, setAgreeClauseError] = useState(false);
    const onSignUpExitClick = () => {
        const ok = window.confirm("회원가입을 취소하시겠습니까?");
        if (ok) {
            onSignClickDataClear();
        }
    };

    const onChange = (e) => {
        // console.log(e.target.name);
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
        } else if (name === "userName") {
            setUserName(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "phoneNumber") {
            setPhoneNumber(value);
        } else if (name === "verifyCode") {
            setVerifyCode(value);
        } else if (name === "password-verify") {
            setPasswordVerify(value);
        }
    };
    const onChangeTerm = (e) => {
        //체크박스 초기화
        setAgreeClauseError(false);
        // setTerm(e.target.checked);

        const {
            target: { name },
        } = e;
        // console.log(name);
        if (name === "email") {
            // setEmail(!);
        } else if (name === "agreeClause") {
            setAgreeClause(!agreeClause);
        } else if (name === "agreeAd") {
            setAgreeAd(!agreeAd);
        }
        // console.log(e.target.value);
    };
    // useEffect(() => {}, [agreeAd, agreeClause]);
    const { isLogin, jwt, userIdx } = useSelector(
        (state) => state.LoginReducer,
    );
    // console.log(isLogin);

    const onSubmit = async (e) => {
        e.preventDefault();

        // 여기에서 이메일 중복확인 로직 돌리기.

        const data = await axios.get(`${ServerSignURL}/users/check-email`, {
            params: { email: email },
        });
        const {
            data: { result: TF },
        } = data;
        // console.log(TF);
        if (TF === "true") {
            setSignInCase(true);
            // console.log("T");
        } else {
            setSignUpCase(true);
            // console.log("F");
        }
    };

    const onSignInClick = async () => {
        const upload = {
            email: email,
            password: password,
        };
        const serverValue = await axios.post(
            `${ServerSignURL}/users/login`,
            upload,
        );
        const { data: serverData } = serverValue;
        // console.log(serverData);
        if (serverData.isSuccess === true) {
            // console.log("isSuccess 성공");
            setServerErrMsg("");
            dispatch(loginAction({ isLogin: true }));
            localStorage.setItem("jwt", serverData.result.jwt);
            localStorage.setItem("userIdx", serverData.result.userIdx); //유저 idx name r구분...
            getUserInfo();

            onSignClickDataClear();
        } else {
            setServerErrMsg(serverData.message);
        }
    };
    const onSignClickDataClear = () => {
        setUserName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setPasswordVerify("");
        onSignClick();
    };
    useEffect(() => console.log(isLogin), [isLogin]);

    const onSignupSumbit = (e) => {
        // e.preventDefault();
        /**검증 로직 만들기
         * 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
         * 2. 약관 동의를 확인한다.
         */
        if (password !== passwordVerify) {
            return setPasswordError(true);
        }
        if (!agreeClause) {
            return setAgreeClauseError(true);
        }
        setPasswordError(false);
        console.log({
            userName,
            email,
            password,
            passwordVerify,
            term,
        });

        // 여기에 이제 api통신 넣어야지.
        onSignUp();
        if (userName !== "" || phoneNumber !== "") {
            console.log("sucess");
        }
    };
    const onSignUp = async () => {
        const SURL = `${ServerSignURL}/users`;
        console.log(SURL);
        const upload = {
            name: userName,
            email: email,
            password: password,
            phoneNum: phoneNumber,
            agreeClause: "agree",
            agreeAd: "agree",
        };

        // const data = await axios({
        //     method: "POST",
        //     url: `${ServerSignURL}/users`,

        //     data: upload,
        // });

        const serverValue = await axios.post(`${ServerSignURL}/users`, upload);
        const { data: serverData } = serverValue;
        console.log(serverData);
        if (serverData.isSuccess === true) {
            setServerErrMsg("");
            onSignClickDataClear();
        } else {
            setServerErrMsg(serverData.message);
        }
    };

    useEffect(() => {
        setAgreeAd(false);
        setAgreeClause(false);
    }, []);

    return (
        <>
            {showSignForm ? (
                <>
                    {signUpCase ? (
                        <>
                            <OuterBox>
                                <SignUpFormWindow>
                                    <div>
                                        <div>회원가입</div>
                                    </div>
                                    <SignUpFormToolKit>
                                        <ExitButton
                                            onClick={() => onSignUpExitClick()}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                size="lg"
                                            />
                                        </ExitButton>
                                        <div>
                                            <div>이름</div>
                                            <input
                                                name="userName"
                                                type="text"
                                                placeholder="이름을 입력해 주세요."
                                                required
                                                value={userName}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                <div>휴대폰 번호</div>
                                                <CountrySelect>
                                                    <option value="+82">
                                                        +82 South Korea
                                                    </option>
                                                    <option value="+81">
                                                        +81 Japan
                                                    </option>
                                                    <option value="+886">
                                                        +886 Taiwan
                                                    </option>
                                                    <option value="+852">
                                                        +852 Hong Kong
                                                    </option>
                                                    <option value="+65">
                                                        +65 Singapore
                                                    </option>
                                                    <option value="+93">
                                                        +93 Afghanistan
                                                    </option>
                                                    <option value="+355">
                                                        +355 Albania
                                                    </option>
                                                    <option value="+213">
                                                        +213 Algeria
                                                    </option>
                                                    <option value="+244">
                                                        +244 Angola
                                                    </option>
                                                    <option value="+54">
                                                        +54 Argentina
                                                    </option>
                                                    <option value="+374">
                                                        +374 Armenia
                                                    </option>
                                                    <option value="+297">
                                                        +297 Aruba
                                                    </option>
                                                    <option value="+61">
                                                        +61 Australia
                                                    </option>
                                                    <option value="+43">
                                                        +43 Austria
                                                    </option>
                                                    <option value="+994">
                                                        +994 Azerbaijan
                                                    </option>
                                                    <option value="+973">
                                                        +973 Bahrain
                                                    </option>
                                                    <option value="+880">
                                                        +880 Bangladesh
                                                    </option>
                                                    <option value="+375">
                                                        +375 Belarus
                                                    </option>
                                                    <option value="+32">
                                                        +32 Belgium
                                                    </option>
                                                    <option value="+501">
                                                        +501 Belize
                                                    </option>
                                                    <option value="+229">
                                                        +229 Benin
                                                    </option>
                                                    <option value="+975">
                                                        +975 Bhutan
                                                    </option>
                                                    <option value="+591">
                                                        +591 Bolivia
                                                    </option>
                                                    <option value="+267">
                                                        +267 Botswana
                                                    </option>
                                                    <option value="+55">
                                                        +55 Brazil
                                                    </option>
                                                    <option value="+673">
                                                        +673 Brunei
                                                    </option>
                                                    <option value="+359">
                                                        +359 Bulgaria
                                                    </option>
                                                    <option value="+226">
                                                        +226 Burkina Faso
                                                    </option>
                                                    <option value="+855">
                                                        +855 Cambodia
                                                    </option>
                                                    <option value="+237">
                                                        +237 Cameroon
                                                    </option>
                                                    <option value=" +1">
                                                        {" "}
                                                        +1 Canada
                                                    </option>
                                                    <option value="+56">
                                                        +56 Chile
                                                    </option>
                                                    <option value="+86">
                                                        +86 China
                                                    </option>
                                                    <option value="+61">
                                                        +61 Christmas Island
                                                    </option>
                                                    <option value="+61">
                                                        +61 Cocos Islands
                                                    </option>
                                                    <option value="+57">
                                                        +57 Colombia
                                                    </option>
                                                    <option value="+269">
                                                        +269 Comoros
                                                    </option>
                                                    <option value="+506">
                                                        +506 Costa Rica
                                                    </option>
                                                    <option value="+385">
                                                        +385 Croatia
                                                    </option>
                                                    <option value="+53">
                                                        +53 Cuba
                                                    </option>
                                                    <option value="+599">
                                                        +599 Curacao
                                                    </option>
                                                    <option value="+357">
                                                        +357 Cyprus
                                                    </option>
                                                    <option value="+420">
                                                        +420 Czech Republic
                                                    </option>
                                                    <option value="+45">
                                                        +45 Denmark
                                                    </option>
                                                    <option value="+253">
                                                        +253 Djibouti
                                                    </option>
                                                    <option value="+593">
                                                        +593 Ecuador
                                                    </option>
                                                    <option value="+20">
                                                        +20 Egypt
                                                    </option>
                                                    <option value="+503">
                                                        +503 El Salvador
                                                    </option>
                                                    <option value="+240">
                                                        +240 Equatorial Guinea
                                                    </option>
                                                    <option value="+372">
                                                        +372 Estonia
                                                    </option>
                                                    <option value="+251">
                                                        +251 Ethiopia
                                                    </option>
                                                    <option value="+298">
                                                        +298 Faroe Islands
                                                    </option>
                                                    <option value="+679">
                                                        +679 Fiji
                                                    </option>
                                                    <option value="+358">
                                                        +358 Finland
                                                    </option>
                                                    <option value="+33">
                                                        +33 France
                                                    </option>
                                                    <option value="+689">
                                                        +689 French Polynesia
                                                    </option>
                                                    <option value="+220">
                                                        +220 Gambia
                                                    </option>
                                                    <option value="+995">
                                                        +995 Georgia
                                                    </option>
                                                    <option value="+49">
                                                        +49 Germany
                                                    </option>
                                                    <option value="+233">
                                                        +233 Ghana
                                                    </option>
                                                    <option value="+30">
                                                        +30 Greece
                                                    </option>
                                                    <option value="+299">
                                                        +299 Greenland
                                                    </option>
                                                    <option value="+502">
                                                        +502 Guatemala
                                                    </option>
                                                    <option value="+224">
                                                        +224 Guinea
                                                    </option>
                                                    <option value="+592">
                                                        +592 Guyana
                                                    </option>
                                                    <option value="+509">
                                                        +509 Haiti
                                                    </option>
                                                    <option value="+504">
                                                        +504 Honduras
                                                    </option>
                                                    <option value="+36">
                                                        +36 Hungary
                                                    </option>
                                                    <option value="+354">
                                                        +354 Iceland
                                                    </option>
                                                    <option value="+91">
                                                        +91 India
                                                    </option>
                                                    <option value="+62">
                                                        +62 Indonesia
                                                    </option>
                                                    <option value="+98">
                                                        +98 Iran
                                                    </option>
                                                    <option value="+964">
                                                        +964 Iraq
                                                    </option>
                                                    <option value="+353">
                                                        +353 Ireland
                                                    </option>
                                                    <option value="+972">
                                                        +972 Israel
                                                    </option>
                                                    <option value="+39">
                                                        +39 Italy
                                                    </option>
                                                    <option value="+962">
                                                        +962 Jordan
                                                    </option>
                                                    <option value="+7">
                                                        +7 Kazakhstan
                                                    </option>
                                                    <option value="+254">
                                                        +254 Kenya
                                                    </option>
                                                    <option value="+383">
                                                        +383 Kosovo
                                                    </option>
                                                    <option value="+965">
                                                        +965 Kuwait
                                                    </option>
                                                    <option value="+996">
                                                        +996 Kyrgyzstan
                                                    </option>
                                                    <option value="+856">
                                                        +856 Laos
                                                    </option>
                                                    <option value="+371">
                                                        +371 Latvia
                                                    </option>
                                                    <option value="+961">
                                                        +961 Lebanon
                                                    </option>
                                                    <option value="+218">
                                                        +218 Libya
                                                    </option>
                                                    <option value="+423">
                                                        +423 Liechtenstein
                                                    </option>
                                                    <option value="+370">
                                                        +370 Lithuania
                                                    </option>
                                                    <option value="+352">
                                                        +352 Luxembourg
                                                    </option>
                                                    <option value="+853">
                                                        +853 Macau
                                                    </option>
                                                    <option value="+389">
                                                        +389 Macedonia
                                                    </option>
                                                    <option value="+261">
                                                        +261 Madagascar
                                                    </option>
                                                    <option value="+265">
                                                        +265 Malawi
                                                    </option>
                                                    <option value="+60">
                                                        +60 Malaysia
                                                    </option>
                                                    <option value="+960">
                                                        +960 Maldives
                                                    </option>
                                                    <option value="+223">
                                                        +223 Mali
                                                    </option>
                                                    <option value="+356">
                                                        +356 Malta
                                                    </option>
                                                    <option value="+692">
                                                        +692 Marshall Islands
                                                    </option>
                                                    <option value="+222">
                                                        +222 Mauritania
                                                    </option>
                                                    <option value="+230">
                                                        +230 Mauritius
                                                    </option>
                                                    <option value="+52">
                                                        +52 Mexico
                                                    </option>
                                                    <option value="+373">
                                                        +373 Moldova
                                                    </option>
                                                    <option value="+976">
                                                        +976 Mongolia
                                                    </option>
                                                    <option value="+382">
                                                        +382 Montenegro
                                                    </option>
                                                    <option value="+212">
                                                        +212 Morocco
                                                    </option>
                                                    <option value="+258">
                                                        +258 Mozambique
                                                    </option>
                                                    <option value="+95">
                                                        +95 Myanmar
                                                    </option>
                                                    <option value="+264">
                                                        +264 Namibia
                                                    </option>
                                                    <option value="+977">
                                                        +977 Nepal
                                                    </option>
                                                    <option value="+31">
                                                        +31 Netherlands
                                                    </option>
                                                    <option value="+687">
                                                        +687 New Caledonia
                                                    </option>
                                                    <option value="+64">
                                                        +64 New Zealand
                                                    </option>
                                                    <option value="+505">
                                                        +505 Nicaragua
                                                    </option>
                                                    <option value="+227">
                                                        +227 Niger
                                                    </option>
                                                    <option value="+234">
                                                        +234 Nigeria
                                                    </option>
                                                    <option value="+47">
                                                        +47 Norway
                                                    </option>
                                                    <option value="+968">
                                                        +968 Oman
                                                    </option>
                                                    <option value="+92">
                                                        +92 Pakistan
                                                    </option>
                                                    <option value="+680">
                                                        +680 Palau
                                                    </option>
                                                    <option value="+970">
                                                        +970 Palestine
                                                    </option>
                                                    <option value="+507">
                                                        +507 Panama
                                                    </option>
                                                    <option value="+675">
                                                        +675 Papua New Guinea
                                                    </option>
                                                    <option value="+595">
                                                        +595 Paraguay
                                                    </option>
                                                    <option value="+51">
                                                        +51 Peru
                                                    </option>
                                                    <option value="+63">
                                                        +63 Philippines
                                                    </option>
                                                    <option value="+48">
                                                        +48 Poland
                                                    </option>
                                                    <option value="+351">
                                                        +351 Portugal
                                                    </option>
                                                    <option value="+974">
                                                        +974 Qatar
                                                    </option>
                                                    <option value="+262">
                                                        +262 Reunion
                                                    </option>
                                                    <option value="+40">
                                                        +40 Romania
                                                    </option>
                                                    <option value="+7">
                                                        +7 Russia
                                                    </option>
                                                    <option value="+250">
                                                        +250 Rwanda
                                                    </option>
                                                    <option value="+685">
                                                        +685 Samoa
                                                    </option>
                                                    <option value="+966">
                                                        +966 Saudi Arabia
                                                    </option>
                                                    <option value="+221">
                                                        +221 Senegal
                                                    </option>
                                                    <option value="+381">
                                                        +381 Serbia
                                                    </option>
                                                    <option value="+248">
                                                        +248 Seychelles
                                                    </option>
                                                    <option value="+232">
                                                        +232 Sierra Leone
                                                    </option>
                                                    <option value="+421">
                                                        +421 Slovakia
                                                    </option>
                                                    <option value="+386">
                                                        +386 Slovenia
                                                    </option>
                                                    <option value="+677">
                                                        +677 Solomon Islands
                                                    </option>
                                                    <option value="+252">
                                                        +252 Somalia
                                                    </option>
                                                    <option value="+27">
                                                        +27 South Africa
                                                    </option>
                                                    <option value="+211">
                                                        +211 South Sudan
                                                    </option>
                                                    <option value="+34">
                                                        +34 Spain
                                                    </option>
                                                    <option value="+94">
                                                        +94 Sri Lanka
                                                    </option>
                                                    <option value="+249">
                                                        +249 Sudan
                                                    </option>
                                                    <option value="+597">
                                                        +597 Suriname
                                                    </option>
                                                    <option value="+46">
                                                        +46 Sweden
                                                    </option>
                                                    <option value="+41">
                                                        +41 Switzerland
                                                    </option>
                                                    <option value="+963">
                                                        +963 Syria
                                                    </option>
                                                    <option value="+992">
                                                        +992 Tajikistan
                                                    </option>
                                                    <option value="+255">
                                                        +255 Tanzania
                                                    </option>
                                                    <option value="+66">
                                                        +66 Thailand
                                                    </option>
                                                    <option value="+228">
                                                        +228 Togo
                                                    </option>
                                                    <option value="+676">
                                                        +676 Tonga
                                                    </option>
                                                    <option value="+216">
                                                        +216 Tunisia
                                                    </option>
                                                    <option value="+90">
                                                        +90 Turkey
                                                    </option>
                                                    <option value="+993">
                                                        +993 Turkmenistan
                                                    </option>
                                                    <option value="+256">
                                                        +256 Uganda
                                                    </option>
                                                    <option value="+380">
                                                        +380 Ukraine
                                                    </option>
                                                    <option value="+971">
                                                        +971 United Arab
                                                        Emirates
                                                    </option>
                                                    <option value="+44">
                                                        +44 United Kingdom
                                                    </option>
                                                    <option value="+1">
                                                        +1 United States
                                                    </option>
                                                    <option value="+598">
                                                        +598 Uruguay
                                                    </option>
                                                    <option value="+998">
                                                        +998 Uzbekistan
                                                    </option>
                                                    <option value="+678">
                                                        +678 Vanuatu
                                                    </option>
                                                    <option value="+58">
                                                        +58 Venezuela
                                                    </option>
                                                    <option value="+84">
                                                        +84 Vietnam
                                                    </option>
                                                    <option value="+967">
                                                        +967 Yemen
                                                    </option>
                                                    <option value="+260">
                                                        +260 Zambia
                                                    </option>
                                                    <option value="+263">
                                                        +263 Zimbabwe
                                                    </option>
                                                </CountrySelect>
                                            </div>

                                            <NumberInputBox>
                                                <input
                                                    name="phoneNumber"
                                                    type="text"
                                                    placeholder="(예시) 01034567890"
                                                    required
                                                    value={phoneNumber}
                                                    onChange={onChange}
                                                />
                                                <div>인증번호 받기</div>
                                            </NumberInputBox>
                                            <VerifyCodeBox
                                                name="verifyCode"
                                                type="text"
                                                placeholder="인증번호를 입력해 주세요."
                                                required
                                                value={verifyCode}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div>
                                            <div>비밀번호</div>
                                            <input
                                                name="password"
                                                type="password"
                                                placeholder="비밀번호를 입력해 주세요."
                                                required
                                                value={password}
                                                onChange={onChange}
                                            />
                                            <div>
                                                {passwordError ? (
                                                    <p>
                                                        비밀번호가
                                                        일치하지않습니다.
                                                    </p>
                                                ) : (
                                                    <p>
                                                        영문 대소문자, 숫자,
                                                        특수문자를 3가지
                                                        이상으로 조합하여 8자
                                                        이상 입력해 주세요.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div>비밀번호 확인</div>
                                            <input
                                                name="password-verify"
                                                type="password"
                                                placeholder="비밀번호를 다시 한번 입력해 주세요."
                                                required
                                                value={passwordVerify}
                                                onChange={onChange}
                                            />
                                        </div>

                                        <div>
                                            <AgreeZone
                                                style={{
                                                    borderBottom:
                                                        "3px solid rgb(241, 244, 247)",
                                                    marginBottom: "6px",
                                                    paddingBottom: "10px",
                                                }}
                                            >
                                                <InputBox
                                                    type="checkbox"
                                                    name="agreeAll"
                                                    id="agreeAll"
                                                    value={term}
                                                    onChange={onChangeTerm}
                                                ></InputBox>
                                                <label>전체 동의</label>
                                            </AgreeZone>
                                            <AgreeZone>
                                                <InputBox
                                                    type="checkbox"
                                                    name="agreeClause"
                                                    id="agreeClause"
                                                    value={agreeClause}
                                                    onChange={onChangeTerm}
                                                ></InputBox>
                                                <label>
                                                    개인정보 수집 및 이용 동의
                                                    (필수)
                                                </label>
                                                {agreeClauseError && (
                                                    <div
                                                        style={{ color: "red" }}
                                                    >
                                                        약관에 동의하셔야
                                                        합니다.
                                                    </div>
                                                )}
                                            </AgreeZone>
                                            <AgreeZone>
                                                <InputBox
                                                    type="checkbox"
                                                    name="agreeAd"
                                                    id="agreeAd"
                                                    value={agreeAd}
                                                    onChange={onChangeTerm}
                                                ></InputBox>
                                                <label>
                                                    이벤트 소식 등 알림 정보
                                                    받기
                                                </label>
                                            </AgreeZone>
                                        </div>
                                        {serverErrMsg !== "" ? (
                                            <p
                                                style={{
                                                    margin: "0",
                                                    color: "red",
                                                }}
                                            >
                                                {serverErrMsg}
                                            </p>
                                        ) : null}
                                        {agreeClause ? (
                                            <SignUpProcessButton
                                                onClick={() => onSignupSumbit()}
                                                style={{
                                                    backgroundColor: "#36f",
                                                    color: "white",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                회원가입하기
                                            </SignUpProcessButton>
                                        ) : (
                                            <SignUpProcessButton
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                회원가입하기
                                            </SignUpProcessButton>
                                        )}
                                    </SignUpFormToolKit>
                                </SignUpFormWindow>
                            </OuterBox>
                            <AlertWindowBox>
                                <AlertWindowOutBox></AlertWindowOutBox>
                            </AlertWindowBox>
                        </>
                    ) : null}
                    {signInCase ? (
                        <>
                            <OuterBox>
                                <SignInFormWindow>
                                    <div>
                                        <div>비밀번호 입력</div>
                                    </div>

                                    <SignUpFormToolKit>
                                        <ExitButton
                                            onClick={() =>
                                                onSignClickDataClear()
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                size="lg"
                                            />
                                        </ExitButton>

                                        <div>
                                            <div>비밀번호</div>
                                            <input
                                                type="password"
                                                placeholder="비밀번호"
                                                required
                                                name="password"
                                                value={password}
                                                onChange={onChange}
                                            />
                                        </div>
                                        {serverErrMsg !== "" ? (
                                            <p
                                                style={{
                                                    margin: "0",
                                                    color: "red",
                                                }}
                                            >
                                                비밀번호가 틀렸습니다.
                                            </p>
                                        ) : null}
                                        <SignUpProcessButton
                                            onClick={() => onSignInClick()}
                                            style={{
                                                backgroundColor: "#36f",
                                                color: "white",
                                                cursor: "pointer",
                                            }}
                                        >
                                            로그인
                                        </SignUpProcessButton>

                                        <div
                                            style={{
                                                margin: "30px auto 0",
                                                color: "#36f",
                                            }}
                                        >
                                            비밀번호 초기화/변경
                                        </div>
                                    </SignUpFormToolKit>
                                </SignInFormWindow>
                            </OuterBox>
                            <AlertWindowBox>
                                <AlertWindowOutBox
                                    onClick={() => {
                                        onSignClickDataClear();
                                    }}
                                ></AlertWindowOutBox>
                            </AlertWindowBox>
                        </>
                    ) : null}
                    {!signUpCase && !signInCase ? (
                        <>
                            <OuterBox>
                                <AlertWindow>
                                    <div>
                                        <img
                                            src="img/header/logo_wanted.png"
                                            alt=""
                                        />
                                    </div>
                                    <ToolKit>
                                        <ExitButton
                                            onClick={() =>
                                                onSignClickDataClear()
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                size="lg"
                                            />
                                        </ExitButton>

                                        <TitleBox>
                                            <div>
                                                직장인을 위한
                                                <br />
                                                커리어 플랫폼, 원티드!
                                            </div>
                                            <div>
                                                커리어 성장과 행복을 위한 여정
                                                <br /> 지금 원티드에서
                                                시작하세요.
                                            </div>
                                        </TitleBox>
                                        <EmailInputForm onSubmit={onSubmit}>
                                            <div>이메일</div>
                                            <input
                                                type="email"
                                                placeholder="이메일을 입력해 주세요."
                                                required
                                                value={email}
                                                onChange={onChange}
                                                name="email"
                                            />

                                            <button>
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                이메일로 계속하기
                                            </button>
                                        </EmailInputForm>
                                        <SocialLoginBox>
                                            <div>
                                                <div>or</div>
                                                <div>다른계정으로 계속하기</div>
                                            </div>
                                            <div>
                                                <div>
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "#fee500",
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="21"
                                                            viewBox="0 0 22 21"
                                                        >
                                                            <path
                                                                fill="#000"
                                                                fillRule="nonzero"
                                                                d="M11 0C5.242 0 0 3.823 0 8.539c0 2.932 1.904 5.519 4.804 7.056l-1.22 4.479c-.107.397.343.712.69.483l5.348-3.548c.452.044.91.069 1.377.069 6.076 0 11-3.823 11-8.54 0-4.715-4.924-8.538-11-8.538"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    Kakao
                                                </div>
                                                <div>
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "#1877f2",
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="23"
                                                            viewBox="0 0 12 23"
                                                        >
                                                            <path
                                                                fill="#fff"
                                                                fillRule="nonzero"
                                                                d="M11.214 12.603l.622-4.055h-3.89V5.917c0-1.11.543-2.191 2.285-2.191H12V.274S10.395 0 8.86 0C5.656 0 3.562 1.942 3.562 5.458v3.09H0v4.055h3.562v9.802c.714.112 1.446.17 2.191.17.746 0 1.478-.058 2.192-.17v-9.802h3.269"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    facebook
                                                </div>
                                                <div>
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "white",
                                                            border: "1px solid #e1e2e3",
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="23"
                                                            height="23"
                                                            viewBox="0 0 23 23"
                                                        >
                                                            <g
                                                                fill="none"
                                                                fillRule="nonzero"
                                                            >
                                                                <path
                                                                    fill="#EA4335"
                                                                    d="M11.5 4.574c1.688 0 3.204.58 4.396 1.72l3.299-3.299C17.203 1.14 14.6 0 11.5 0 7.005 0 3.115 2.577 1.223 6.335l3.842 2.98c.905-2.718 3.44-4.741 6.435-4.741z"
                                                                ></path>
                                                                <path
                                                                    fill="#4285F4"
                                                                    d="M22.54 11.761c0-.815-.073-1.6-.21-2.352H11.5v4.448h6.19c-.268 1.438-1.078 2.656-2.296 3.471v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.453z"
                                                                ></path>
                                                                <path
                                                                    fill="#FBBC05"
                                                                    d="M5.065 13.685c-.23-.69-.36-1.427-.36-2.185s.13-1.495.36-2.185v-2.98H1.223C.444 7.888 0 9.645 0 11.5c0 1.856.444 3.612 1.223 5.165l3.842-2.98z"
                                                                ></path>
                                                                <path
                                                                    fill="#34A853"
                                                                    d="M11.5 23c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.741H1.223v2.98C3.115 20.423 7.005 23 11.5 23z"
                                                                ></path>
                                                                <path d="M0 0L23 0 23 23 0 23z"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    google
                                                </div>
                                                <div>
                                                    <div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="19"
                                                            height="24"
                                                            viewBox="0 0 19 24"
                                                        >
                                                            <path
                                                                fill="#fff"
                                                                fillRule="nonzero"
                                                                d="M15.868 12.55c.033 3.574 3.098 4.764 3.132 4.779-.026.084-.49 1.695-1.615 3.36-.972 1.439-1.982 2.872-3.572 2.902-1.562.03-2.065-.938-3.851-.938s-2.344.908-3.823.967c-1.535.059-2.704-1.556-3.684-2.99C.45 17.698-1.08 12.343.975 8.73c1.022-1.795 2.848-2.932 4.83-2.96 1.506-.03 2.929 1.026 3.85 1.026.921 0 2.65-1.27 4.467-1.083.761.032 2.897.31 4.268 2.343-.11.07-2.548 1.506-2.522 4.494m-2.936-8.777c.815-.999 1.363-2.389 1.213-3.772-1.174.048-2.594.792-3.437 1.79-.755.884-1.416 2.298-1.238 3.654 1.31.103 2.647-.673 3.462-1.672"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    Apple
                                                </div>
                                            </div>
                                        </SocialLoginBox>
                                        <BottomText>
                                            <p>
                                                걱정마세요! 여러분의 지원 활동은
                                                SNS에 노출되지 않습니다.
                                                <br />
                                                회원가입 시{" "}
                                                <a
                                                    style={{ color: "blue" }}
                                                    href="https://help.wanted.co.kr/hc/ko/articles/360035484292"
                                                >
                                                    개인정보 처리방침
                                                </a>
                                                과{" "}
                                                <a
                                                    style={{ color: "blue" }}
                                                    href="https://help.wanted.co.kr/hc/ko/articles/360035844551"
                                                >
                                                    이용약관
                                                </a>
                                                을 확인하였으며, 동의합니다.
                                            </p>
                                        </BottomText>
                                    </ToolKit>
                                </AlertWindow>
                            </OuterBox>
                            <AlertWindowBox>
                                <AlertWindowOutBox
                                    onClick={() => {
                                        onSignClickDataClear();
                                    }}
                                ></AlertWindowOutBox>
                            </AlertWindowBox>
                        </>
                    ) : null}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default SignForm;

const InputBox = styled.input`
    width: 14px !important;
    height: 14px !important;
    margin-right: 10px;
`;

const AgreeZone = styled.div`
    display: flex;
    align-items: center;

    & label {
        font-size: 15px;
    }
`;

const OuterBox = styled.div`
    height: 75vh;
    overflow-y: auto;
    display: float;
    width: 400px;
    // top: 10%;
    position: absolute;
    // transform: translateX(-48%);
    transform: translate(-48%, 60%);
    left: 50%;
    display: flex;
    z-index: 600;
    flex-direction: column;
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;

const VerifyCodeBox = styled.input`
    font-size: 14px;
    width: 100%;
    color: rgb(204, 204, 204);
    background-color: rgb(241, 244, 247);
    border: 1px solid #e1e2e3;
`;

const NumberInputBox = styled.div`
    display: flex;
    margin-bottom: 15px;
    & > input {
        width: 218px;
    }
    & > div {
        color: rgb(204, 204, 204);
        background-color: rgb(241, 244, 247);
        text-align: center;
        padding: 15px 0;
        // border: 1px solid #e1e2e3;
        font-size: 14px;
        min-width: 117px;
        border-radius: 5px;
        margin-left: 10px;
        height: 50px;
    }
`;

const CountrySelect = styled.select`
    width: 100%;
    height: 50px;
    padding: 0 15px;
    // background-color: #f2f4f7;
    border: 1px solid #e1e2e3;
    border-radius: 8px;
    font-size: 15px;
    margin-bottom: 14px;
`;
const SignUpProcessButton = styled.button`
    font-size: 16px;
    border: 0;
    border-radius: 27px;
    height: 54px;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    width: 100%;
    background-color: rgb(241, 244, 247);
    color: rgb(210, 211, 212);
`;

const BottomText = styled.div`
    text-align: center;
    position: relative;
    bottom: -40px;
    font-size: 12px;
    color: rgb(153, 153, 153);
`;

const SocialLoginBox = styled.div`
    display: relative;
    & > div:nth-child(1) {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: rgb(150, 150, 150);
        & > div {
            margin-top: 10px;
        }
    }

    & > div:nth-child(2) {
        position: relative;
        display: flex;
        & > div {
            margin-top: 10px;
            width: 25%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 13px;
            color: #666;
            & > div {
                background-color: black;
                border-radius: 50%;
                width: 56px;
                height: 56px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 6px;
            }
        }
    }
`;
const EmailInputForm = styled.form`
    margin-top: 40px;
    color: rgb(102, 102, 102);
    & > div:nth-child(1) {
        padding-bottom: 10px;
        font-size: 14px;
    }
    & > input:nth-child(2) {
        width: 100%;
        height: 50px;
        margin-bottom: 14px;
        // border: 1px solid rgb(102, 102, 102);
        padding-right: 15px;
        padding-left: 15px;
        border-radius: 5px;
        border: 1px solid #e1e2e3;
    }
    & > button:nth-child(3) {
        border: 0;
        border-radius: 27px;
        height: 54px;
        font-weight: 600;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        width: 100%;
        background-color: #36f;
    }
`;

const TitleBox = styled.div`
    text-align: center;
    & > div:nth-child(1) {
        font-size: 26px;
    }
    & > div:nth-child(2) {
        margin-top: 16px;
        font-size: 16px;
        color: rgb(102, 102, 102);
    }
`;

const ExitButton = styled.div`
    color: rgb(153, 153, 153);
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;

    // width: 54px;
    // height: 54px;
    padding: 15px;
`;

const ToolKit = styled.div`
    padding: 20px;
    height: 100%;
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    width: 100%;
    height: 100%;
`;

const SignUpFormToolKit = styled(ToolKit)`
    font-size: 14px;
    & > div {
        padding-bottom: 22px;
    }
    & > div > div:nth-child(1) {
        font-size: 12px;
        padding-bottom: 10px;
    }
    & > div input {
        border: 1px solid rgb(225, 226, 227);
        width: 100%;
        height: 50px;
        border-radius: 5px;
        padding: 16px 15px 14px;
    }

    & > div > div:nth-child(1) > div {
        padding-bottom: 10px;
    }
    & > div > div:nth-child(3) {
        font-size: 12px;
        color: rgb(102, 102, 102);
    }
`;

const AlertWindowOutBox = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const AlertWindowBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
`;

const PopUpWindowStyle = styled.div`
    background-color: black;
    z-index: 200;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2),
        0 6px 40px 0 rgba(0, 0, 0, 0.19);

    & {
        background: #ffff;
        border-radius: 5px;
    }
`;

const SignInFormWindow = styled(PopUpWindowStyle)`
    width: 400px;
    height: 325px;
    & > div:nth-child(1) {
        display: flex;
        justify-content: center;
        padding: 16px 20px;
    }
`;

const AlertWindow = styled(PopUpWindowStyle)`
    display: float;
    width: 400px;
    height: 680px;
    // top: 24%;
    position: absolute;
    // transform: translateX(-48%);
    // transform: translate(-48%, 60%);
    // left: 50%;
    display: flex;
    z-index: 600;
    flex-direction: column;
    & > div:nth-child(1) {
        display: flex;
        justify-content: center;
        padding: 16px 20px;
    }
`;

const SignUpFormWindow = styled(PopUpWindowStyle)`
    display: float;
    width: 400px;
    height: 866px;
    // top: 30%;
    position: absolute;
    // transform: translateX(-48%);
    // transform: translate(-48%, 50%);
    // left: 50%;
    display: flex;
    z-index: 600;
    flex-direction: column;
    & > div:nth-child(1) {
        display: flex;
        justify-content: center;
        padding: 16px 20px;
    }
`;
