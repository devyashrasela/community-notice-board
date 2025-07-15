import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineDelete, AiOutlineFlag, AiOutlineSave } from "react-icons/ai";

export default function NoticeCard({
  userImage = "https://ui-avatars.com/api/?name=Admin", // default admin/user avatar
  userName = "Admin",
  date = "2025-07-15",
  tags = ["Notice"],
  noticeImage = "https://ui-avatars.com/api/?name=Admin",
  title = "Notice Title",
  description = "This is the description of an important notice for the community.",
  saved = false,
  onDelete,
  onReport,
  onSave,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full rounded-xl shadow-lg p-6 bg-yellow-50 border-2 border-yellow-400 mb-6">
      {/* Top Bar: User Info and Menu */}
      <div className="flex items-start justify-between mb-4 border-b-1 border-yellow-400 pb-5">
        <div className="flex items-center gap-4 ">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div className="">
            <div className="font-semibold text-yellow-900">{userName}</div>
            <div className="flex gap-2 items-center text-xs text-yellow-600 mt-0.5">
              <span>{new Date(date).toLocaleDateString()}</span>
              <span className="flex gap-1">
                {tags.map((tag, i) => (
                  <span
                    className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium"
                    key={i}
                  >{tag}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
        {/* Menu button */}
        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-yellow-100"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HiOutlineDotsVertical size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md z-10 text-sm">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 text-red-600"
                onClick={onDelete}
              >
                <AiOutlineDelete /> Delete
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 text-yellow-600"
                onClick={onReport}
              >
                <AiOutlineFlag /> Report
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 text-blue-600"
                onClick={onSave}
              >
                <AiOutlineSave /> Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notice Body: Optional Image, Title, Content */}
      <div className="mb-3 border-b-1 border-yellow-400 pb-5">
        {noticeImage && (
          <img
            src={noticeImage}
            alt={title}
            className="w-full rounded-md max-h-60 object-cover mb-3"
          />
        )}
        <h3 className="text-lg font-bold text-yellow-700 mb-1">{title}</h3>
        <p className="text-gray-800 mb-3">{description}</p>
      </div>

      {/* Actions: Save only (could add more as needed) */}
      <div className="flex items-center gap-6 pt-2 border-t border-yellow-100">
        <button
          className={`flex items-center gap-1 text-gray-600 hover:text-blue-600 transition ${
            saved ? "text-blue-600 font-bold" : ""
          }`}
          onClick={onSave}
        >
          <AiOutlineSave className="text-lg" />
          Save
        </button>
      </div>
    </div>
  );
}
