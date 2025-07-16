// components/Home/Posts.js
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import PostCard from "./SimplePostCard";
import { PostsSelector, deletePost } from "../../../Redux/Reducers/PostsReducer";
import PostsHeader from "./PostsHeader/PostsHeader";

function Posts() {
    const posts = useSelector(PostsSelector);
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState("all");

    // Sort posts by date (newest first) and then filter
    const sortedAndFilteredPosts = useMemo(() => {
        const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return sortedPosts.filter(post => {
            if (activeFilter === "all") return true;
            if (activeFilter === "post" || activeFilter === "notice" || activeFilter === "event") {
                return post.type === activeFilter;
            }
            return post.tags?.some(tag => tag.toLowerCase() === activeFilter);
        });
    }, [posts, activeFilter]);

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost(postId));
        }
    };

    return (
        <div className="w-1/2 h-[85vh] overflow-auto scrollbar-hide">
            <PostsHeader onFilterChange={setActiveFilter} />
            {sortedAndFilteredPosts.map((post) => (
                <PostCard 
                    key={post.id} 
                    {...post} 
                    onDelete={() => handleDelete(post.id)}
                />
            ))}
        </div>
    );
}

export default Posts;
