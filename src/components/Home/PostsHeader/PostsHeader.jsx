// import { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { PostsSelector } from "../../../../Redux/Reducers/PostsReducer";
// import { UserSelector } from "../../../../Redux/Reducers/UserRedicer";
// import CreatePostForm    from "./CreatePostForm";

// function PostsHeader({ onFilterChange }) {
//   const [activeFilter,   setActiveFilter]   = useState("all");
//   const [showForm,       setShowForm]       = useState(false);
//   const [createType,     setCreateType]     = useState("");
//   const [menuOpen,       setMenuOpen]       = useState(false);

//   const posts = useSelector(PostsSelector);
//   const user  = useSelector(UserSelector);
//   console.log(user);

//   /* -------- helper to know if current user is admin -------- */
//   const isAdmin = (
//     (user?.type && user.type.toLowerCase() === "admin") ||
//     (user?.role && user.role.toLowerCase() === "admin")
//   );

//   /* -------- click-outside detector for the drop menu -------- */
//   const menuRef = useRef(null);
//   useEffect(() => {
//     const close = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target))
//         setMenuOpen(false);
//     };
//     document.addEventListener("mousedown", close);
//     return () => document.removeEventListener("mousedown", close);
//   }, []);

//   /* -------- unique tags & filter options -------- */
//   const uniqueTags = [...new Set(posts.flatMap(p => p.tags || []))].sort();

//   const filters = [
//     { id: "all",    label: "All",     count: posts.length },
//     { id: "post",   label: "Posts",   count: posts.filter(p => p.type==="post").length },
//     { id: "notice", label: "Notices", count: posts.filter(p => p.type==="notice").length },
//     { id: "event",  label: "Events",  count: posts.filter(p => p.type==="event").length },
//     ...uniqueTags.map(t => ({
//       id: t.toLowerCase(),
//       label: t,
//       count: posts.filter(p => p.tags?.includes(t)).length
//     }))
//   ];

//   /* -------- handlers -------- */
//   const applyFilter = (id) => { setActiveFilter(id); onFilterChange(id); };

//   const openForm  = (t) => { setCreateType(t); setShowForm(true); setMenuOpen(false); };
//   const closeForm = ()   => { setShowForm(false); setCreateType(""); };

//   /* -------- JSX -------- */
//   return (
//     <>
//       <div className="w-full h-35 rounded-xl mb-5 border-2 border-gray-200 bg-white p-4 flex">

//         {/* ------------  FILTER SIDE ------------ */}
//         <div className="flex-1 pr-4">
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">Filter Posts</h3>

//           <div className="h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             <div className="flex flex-wrap gap-2 pr-2">
//               {filters.map(f => (
//                 <button
//                   key={f.id}
//                   onClick={() => applyFilter(f.id)}
//                   className={`px-3 py-1 text-sm rounded-full border whitespace-nowrap transition ${
//                     activeFilter===f.id
//                       ? "bg-blue-500 text-white border-blue-500"
//                       : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                   }`}
//                 >
//                   {f.label} ({f.count})
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* vertical divider */}
//         <div className="w-px bg-gray-200 mx-4" />

//         {/* ------------  CREATE SIDE ------------ */}
//         <div ref={menuRef} className="relative flex-shrink-0">
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">Create New Post</h3>

//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
//             + Create Post
//           </button>

//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 text-sm">
//               {isAdmin && (
//                 <button
//                   onClick={() => openForm("notice")}
//                   className="w-full text-left px-4 py-2 text-yellow-700 hover:bg-yellow-50 border-b">
//                   📢 Notice
//                 </button>
//               )}
//               <button
//                 onClick={() => openForm("post")}
//                 className="w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-50 border-b">
//                 📝 Post
//               </button>
//               <button
//                 onClick={() => openForm("event")}
//                 className="w-full text-left px-4 py-2 text-green-700 hover:bg-green-50">
//                 🎉 Event
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ----------  CREATE FORM MODAL ---------- */}
//       {showForm && (
//         <CreatePostForm
//           type={createType}
//           onClose={closeForm}
//           onSubmit={(data) => { console.log("new post", data); closeForm(); }}
//         />
//       )}
//     </>
//   );
// }

// export default PostsHeader;
// components/Home/PostsHeader/PostsHeader.js
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PostsSelector } from "../../../../Redux/Reducers/PostsReducer";
import { UserSelector } from "../../../../Redux/Reducers/UserRedicer";
import CreatePostForm from "./CreatePostForm";

function PostsHeader({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [createType, setCreateType] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const posts = useSelector(PostsSelector);
  const user = useSelector(UserSelector);

  const isAdmin = (
    (user?.type && user.type.toLowerCase() === "admin") ||
    (user?.role && user.role.toLowerCase() === "admin")
  );

  const menuRef = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const uniqueTags = [...new Set(posts.flatMap(p => p.tags || []))].sort();

  const filters = [
    { id: "all", label: "All", count: posts.length },
    { id: "post", label: "Posts", count: posts.filter(p => p.type === "post").length },
    { id: "notice", label: "Notices", count: posts.filter(p => p.type === "notice").length },
    { id: "event", label: "Events", count: posts.filter(p => p.type === "event").length },
    ...uniqueTags.map(t => ({
      id: t.toLowerCase(),
      label: t,
      count: posts.filter(p => p.tags?.includes(t)).length
    }))
  ];

  const applyFilter = (id) => { 
    setActiveFilter(id); 
    onFilterChange?.(id); 
  };

  const openForm = (t) => { 
    setCreateType(t); 
    setShowForm(true); 
    setMenuOpen(false); 
  };
  
  const closeForm = () => { 
    setShowForm(false); 
    setCreateType(""); 
  };

  return (
    <>
      <div className="w-full h-35 rounded-xl mb-5 border-2 border-gray-200 bg-white p-4 flex">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Filter Posts</h3>
          <div className="h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="flex flex-wrap gap-2 pr-2">
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => applyFilter(f.id)}
                  className={`px-3 py-1 text-sm rounded-full border whitespace-nowrap transition ${
                    activeFilter === f.id
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-px bg-gray-200 mx-4" />

        <div ref={menuRef} className="relative flex-shrink-0">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Create New Post</h3>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
            + Create Post
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 text-sm">
              {isAdmin && (
                <button
                  onClick={() => openForm("notice")}
                  className="w-full text-left px-4 py-2 text-yellow-700 hover:bg-yellow-50 border-b">
                  📢 Notice
                </button>
              )}
              <button
                onClick={() => openForm("post")}
                className="w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-50 border-b">
                📝 Post
              </button>
              <button
                onClick={() => openForm("event")}
                className="w-full text-left px-4 py-2 text-green-700 hover:bg-green-50">
                🎉 Event
              </button>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <CreatePostForm
          type={createType}
          onClose={closeForm}
          onSubmit={(data) => {
            console.log("new post", data);
            closeForm();
          }}
        />
      )}
    </>
  );
}

export default PostsHeader;

