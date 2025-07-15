import NotificationCard from "./NotificationCard";

function NotificationsContainer(props) {
    return (
        <div className="h-[80vh] w-1/4 overflow-auto scrollbar-hide">
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
        </div>
    );
}

export default NotificationsContainer;