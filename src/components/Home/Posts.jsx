import { useSelector,useDispatch } from "react-redux";
import PostCard from "./SimplePostCard";
import { PostsSelector } from "../../../Redux/Reducers/PostsReducer";
import { PostsActions } from "../../../Redux/Reducers/PostsReducer";

function Posts() {
    const posts = useSelector(PostsSelector);
    const dispatch = useDispatch();
    return (
        <div className="w-1/2 h-[85vh] overflow-auto scrollbar-hide">
            {posts.map((post,i)=><PostCard key={i} {...post} onDelete={()=>dispatch(PostsActions.delete(post.id))}/>)}
        </div>
    );
}

export default Posts;