import MemberCard from "./MemberCard";

function Members(props) {
    return (
        <div className="h-full w-full flex px-30 pt-10 gap-5">
            <div className="h-[80vh] w-1/3">
                <MemberCard/>
            </div>
        </div>
    );
}

export default Members;