import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineSave, AiOutlineFlag, AiOutlineCalendar, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

export default function EventCard({
  userImage = "https://ui-avatars.com/api/?name=Organizer",    // User/organizer avatar
  userName = "Organizer Name",
  createdAt = "2025-07-15T12:45:00",       // Date/time of creation
  tags = ["Public", "Meetup"],
  eventImage = "https://ui-avatars.com/api/?name=Organizer",
  eventName = "Community Meetup",
  description = "Join us for a neighborhood event with fun activities.",
  eventDate = "2025-07-20T16:00:00",
  location = "Community Hall",
  organizer = "Community Team",
  liked = false,
  saved = false,
  onLike,
  onComment,
  onSave,
  onRSVP,
  onReport,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full rounded-xl shadow-lg p-6 bg-white border border-green-300 mb-6">
      {/* Top: User details and menu */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-green-200 bg-white"
          />
          <div>
            <div className="font-semibold text-green-900">{userName}</div>
            <div className="flex gap-2 items-center text-xs text-green-700">
              <span>{new Date(createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
            <div className="flex gap-1 mt-1">
              {tags.map((tag, i) => (
                <span
                  className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-xs font-medium"
                  key={i}
                >{tag}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Menu */}
        <div className="relative self-start">
          <button
            className="p-1 rounded-full hover:bg-green-100"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HiOutlineDotsVertical size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md z-10 text-sm">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-blue-600"
                onClick={onSave}
              >
                <AiOutlineSave /> Save
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-yellow-600"
                onClick={onReport}
              >
                <AiOutlineFlag /> Report
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="border-green-100 mb-3" />

      {/* Main Section: Event Image and Content */}
      <div className="mb-3">
        {eventImage && (
          <img
            src={eventImage}
            alt={eventName}
            className="w-full max-h-60 object-cover rounded-md mb-3"
          />
        )}
        <h3 className="text-lg font-bold text-green-800 mb-1">{eventName}</h3>
        <p className="text-gray-700 mb-3">{description}</p>
      </div>
      <hr className="border-green-100 mb-3" />

      {/* Date, Time, Location */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2 text-green-800">
          <AiOutlineCalendar className="text-lg" />
          <span className="text-sm font-medium">
            {new Date(eventDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
        </div>
        <div className="text-sm text-green-700 font-semibold">{location}</div>
      </div>

      <hr className="border-green-100 mb-3" />

      {/* Organizer */}
      <div className="text-xs text-green-700 font-medium mb-3">Organized by: {organizer}</div>
      <hr className="border-green-100 mb-3" />

      {/* Actions: Like, Comment, Save, RSVP */}
      <div className="flex items-center gap-5 pt-2">
        <button
          className={`flex items-center gap-1 text-gray-600 hover:text-green-700 transition ${liked ? "text-green-700 font-bold" : ""}`}
          onClick={onLike}
        >
          <AiOutlineHeart className="text-lg" />
          Like
        </button>
        <button
          className="flex items-center gap-1 text-gray-600 hover:text-green-700 transition"
          onClick={onComment}
        >
          <AiOutlineComment className="text-lg" />
          Comment
        </button>
        <button
          className={`flex items-center gap-1 text-gray-600 hover:text-green-700 transition ${saved ? "text-green-700 font-bold" : ""}`}
          onClick={onSave}
        >
          <AiOutlineSave className="text-lg" />
          Save
        </button>
        <button
          className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 font-semibold px-3 py-1 rounded transition"
          onClick={onRSVP}
        >
          RSVP
        </button>
      </div>
    </div>
  );
}
