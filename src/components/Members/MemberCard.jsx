import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function MemberCard({
  id,
  name = "Member Name",
  email = "member@example.com",
  role = "User", // or "Admin"
  totalPosts = 0,
  totalParticipations = 0,
  onView,
  onEdit,
  onRemove,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close the menu when click outside
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

  // Generate profile image URL based on name
  const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  // Role to color mapping
  const badgeStyle =
    role.toLowerCase() === "admin"
      ? "bg-red-100 text-red-600 border-red-300"
      : "bg-blue-100 text-blue-600 border-blue-300";

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow p-5 flex items-center gap-4 border border-gray-200 relative">
      {/* Profile Image */}
      <img
        src={profileImage}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border border-gray-300"
      />
      {/* Member Info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-md text-gray-900 truncate">{name}</div>
        <div className="text-sm text-gray-500 truncate">{email}</div>
        <span
          className={`inline-block text-xs font-medium capitalize px-2 py-1 mt-1 rounded-lg border ${badgeStyle}`}
        >
          {role}
        </span>
        {/* Stats */}
        <div className="flex gap-4 mt-2">
          <div className="text-xs text-gray-600">
            <span className="font-semibold text-blue-600">{totalPosts}</span> Posts
          </div>
          <div className="text-xs text-gray-600">
            <span className="font-semibold text-green-600">{totalParticipations}</span> Participations
          </div>
        </div>
      </div>
      {/* Options Button */}
      <div className="relative" ref={menuRef}>
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <HiOutlineDotsVertical size={20} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-10 text-sm">
            {/* Menu items: customize as needed */}
            <button
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
              onClick={() => {
                setMenuOpen(false);
                onView && onView(id);
              }}
            >
              View
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-green-50 text-green-700"
              onClick={() => {
                setMenuOpen(false);
                onEdit && onEdit(id);
              }}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
              onClick={() => {
                setMenuOpen(false);
                onRemove && onRemove(id);
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
