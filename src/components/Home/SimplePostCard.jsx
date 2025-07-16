import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserSelector } from "../../../Redux/Reducers/UserRedicer";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  AiOutlineDelete, AiOutlineFlag, AiOutlineSave,
  AiOutlineHeart, AiOutlineComment, AiOutlineCalendar
} from "react-icons/ai";

export default function PostCard({
  type = "event",
  userImage = "https://ui-avatars.com/api/?name=User",
  userName = "User Name",
  date = "2025-07-15T12:45:00",
  tags = [],
  image = "",
  title = "Title",
  description = "",
  content = "",
  eventDate = "",
  location = "",
  organizer = "",
  liked = false,
  saved = false,
  onDelete,
  onReport,
  onSave,
  onLike,
  onComment,
  onRSVP,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  
  // Get user data from Redux store
  const user = useSelector(UserSelector);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Card-style mapping based on type
  const styleMap = {
    notice: {
      card: "bg-yellow-50 border-yellow-400 border-2",
      headerText: "text-yellow-900",
      tag: "bg-yellow-100 text-yellow-700",
      title: "text-yellow-700 font-bold",
      border: "border-yellow-400",
      menuHover: "hover:bg-yellow-100"
    },
    post: {
      card: "bg-white border border-gray-200",
      headerText: "text-gray-900",
      tag: "bg-blue-50 text-blue-600",
      title: "text-blue-900 font-semibold",
      border: "border-gray-200",
      menuHover: "hover:bg-gray-100"
    },
    event: {
      card: "bg-white border border-green-300",
      headerText: "text-green-900",
      tag: "bg-green-100 text-green-700",
      title: "text-green-800 font-bold",
      border: "border-green-300",
      menuHover: "hover:bg-green-100"
    }
  };

  const style = styleMap[type] || styleMap.post;

  return (
    <div className={`w-full rounded-xl shadow-lg p-6 ${style.card} mb-6`}>
      {/* Header: User info and menu */}
      <div className={`flex items-start justify-between mb-4 pb-4 border-b ${style.border}`}>
        <div className="flex items-center gap-4">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div>
            <div className={`font-semibold ${style.headerText}`}>
              {userName}
            </div>
            <div className="flex gap-2 items-center text-xs mt-0.5">
              <span className={style.headerText}>
                {new Date(date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
              </span>
              <div className="flex gap-1">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-full font-medium ${style.tag}`}
                  >{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Menu for notice, post, event */}
        <div className="relative" ref={menuRef}>
          <button
            className={`p-1 rounded-full ${style.menuHover}`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HiOutlineDotsVertical size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md z-10 text-sm">
              {/* Delete button - only show for Admin */}
              {user?.type === "Admin" && (
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600"
                  onClick={onDelete}
                >
                  <AiOutlineDelete /> Delete
                </button>
              )}
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 text-yellow-600"
                onClick={onReport}
              >
                <AiOutlineFlag /> Report
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-blue-600"
                onClick={onSave}
              >
                <AiOutlineSave /> Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Section: Media/Image and Content */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full rounded-md max-h-60 object-cover mb-3"
        />
      )}

      {type === "event" && eventDate && (
        <div className="mb-2 flex items-center gap-2">
          <AiOutlineCalendar className="text-lg text-green-700" />
          <span className="text-sm text-green-800 font-medium">
            {new Date(eventDate).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
          </span>
          <span className="text-xs font-semibold text-green-700 ml-3">{location}</span>
        </div>
      )}

      <h3 className={`mb-1 mt-2 ${style.title}`}>
        {title}
      </h3>
      <p className="text-gray-700 mb-2">
        {type === "post" ? content : description || content}
      </p>
      {type === "event" && (
        <div className="text-xs text-green-700 mb-3 font-medium">Organized by: {organizer}</div>
      )}

      <div
        className={
          type === "event"
            ? "flex items-center gap-5 pt-2 border-t border-green-100"
            : "flex items-center gap-6 pt-2 border-t"
        }
      >
        {(type === "post" || type === "event") && (
          <button
            className={
              `flex items-center gap-1 ${type === "event" ? "text-gray-600 hover:text-green-700" : "text-gray-600 hover:text-blue-600"} transition ` +
              (liked ? (type === "event" ? "text-green-700 font-bold" : "text-blue-600 font-bold") : "")
            }
            onClick={onLike}
          >
            <AiOutlineHeart className="text-lg" />
            Like
          </button>
        )}
        {(type === "post" || type === "event") && (
          <button
            className={`flex items-center gap-1 text-gray-600 ${type === "event" ? "hover:text-green-700" : "hover:text-blue-600"} transition`}
            onClick={onComment}
          >
            <AiOutlineComment className="text-lg" />
            Comment
          </button>
        )}
        <button
          className={
            `flex items-center gap-1 text-gray-600 ` +
            (type === "event"
              ? "hover:text-green-700"
              : type === "notice"
              ? "hover:text-blue-600"
              : "hover:text-blue-600") +
            " transition " +
            (saved
              ? type === "event"
                ? "text-green-700 font-bold"
                : "text-blue-600 font-bold"
              : "")
          }
          onClick={onSave}
        >
          <AiOutlineSave className="text-lg" />
          Save
        </button>
        {type === "event" && (
          <button
            className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 font-semibold px-3 py-1 rounded transition"
            onClick={onRSVP}
          >
            RSVP
          </button>
        )}
      </div>
    </div>
  );
}
