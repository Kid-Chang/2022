import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
    const auth = getAuth();

    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        // console.log(e.target. name);
        let provider;
        if (name === "google") {
            //do something
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            //do somethings
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(auth, provider);
        console.log(data);
    };

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};
export default Auth;
