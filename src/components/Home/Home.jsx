import ProfileCard from "./ProfileCard";
import Posts from "./Posts";
import NotificationsContainer from "./NotificationsContainer";

function Home() {
    return (
        <div className="h-full w-full flex px-30 pt-10 gap-5">
            <ProfileCard/>            
            <Posts/>
            <NotificationsContainer/>
        </div>
    );
}

export default Home;