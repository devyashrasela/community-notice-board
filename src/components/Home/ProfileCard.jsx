import { useNavigate } from "react-router-dom";

function ProfileCard({
    profilePhoto = "https://ui-avatars.com/api/?name=User",
    userName = "John Doe",
    role = "User",
    totalPosts = 0,
    totalParticipations = 0,
}) {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    return (
        <div
            className="
                max-w-1/5 w-full h-1/2
                bg-white
                rounded-2xl
                border border-gray-200
                shadow
                flex flex-col items-center
                p-7
                transition-shadow duration-200
            "
        >
            <img
                src={profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-white"
            />
            <h2 className="text-xl font-semibold mb-1 text-gray-900">{userName}</h2>
            <span className="
                text-xs uppercase tracking-wide
                py-1 px-3 rounded-full
                bg-gray-100 text-gray-600 mb-4
                border border-gray-200
            ">{role}</span>
            <div className="flex w-full justify-between mt-1 mb-6 px-3">
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg text-blue-700">{totalPosts}</span>
                    <span className="text-xs text-gray-500">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg text-blue-700">{totalParticipations}</span>
                    <span className="text-xs text-gray-500">Participations</span>
                </div>
            </div>
            <button
                className="
                    bg-blue-500
                    text-white
                    px-6 py-2
                    rounded-lg font-medium
                    shadow transition
                    hover:bg-blue-600 hover:shadow-md
                "
                onClick={handleEditProfile}
            >
                Edit Profile
            </button>
        </div>
    );
}

export default ProfileCard;
