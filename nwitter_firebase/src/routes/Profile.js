import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
    const auth = getAuth();

    const onLogOutClick = () => {
        signOut(auth);
    };
    return (
        <span>
            <button onClick={onLogOutClick}>Log OUT</button>
        </span>
    );
};
export default Profile;
