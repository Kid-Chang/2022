import { getAuth, signOut, updateProfile } from "firebase/auth";
import {
    collection,
    where,
    getFirestore,
    query,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const auth = getAuth();

    const onLogOutClick = () => {
        signOut(auth);
    };
    const getMyNweets = async () => {
        const nweets = query(
            collection(getFirestore(), "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt"),
        );
        const querySnapshot = await getDocs(nweets);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    };
    useEffect(() => getMyNweets, []);

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
            refreshUser();
            console.log("update your profile");
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display name"
                    onChange={onChange}
                    value={newDisplayName}
                />
                <input type="submit" value="Update Name" />
            </form>
            <button onClick={onLogOutClick}>Log OUT</button>
        </>
    );
};
export default Profile;
