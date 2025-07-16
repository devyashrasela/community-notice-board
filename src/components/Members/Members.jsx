import { useSelector } from "react-redux";
import { UserListSelector } from "../../../Redux/Reducers/UserListReducer";
import MemberCard from "./MemberCard";

function Members(props) {
    const userList = useSelector(UserListSelector);

    return (
        <div className="h-full w-full flex px-30 pt-10 gap-5">
            <div className="h-[80vh] w-1/3 flex flex-col gap-5 overflow-auto scrollbar-hide">
                {userList.map((userData) => (
                    <MemberCard
                        key={userData.id}
                        id={userData.id}
                        name={userData.name}
                        role={userData.role}
                        email={userData.email}
                        totalPosts={userData.totalPosts}
                        totalParticipations={userData.totalParticipations}
                    />
                ))}
            </div>
        </div>
    );
}

export default Members;
