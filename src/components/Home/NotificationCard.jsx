export default function NotificationCard({
  heading = "New Notice Added",
  dateTime = new Date().toISOString(),
  message = "A new notice has been posted in your community. Check it now!",
  tags = ["notice", "important"],
}) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4 border-1 border-blue-200 mb-4">
      {/* Top: Heading & Date */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-md text-blue-400">{heading}</h2>
        <span className="text-xs text-gray-400">
          {new Date(dateTime).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      </div>
      
      {/* Message */}
      <div className="text-gray-500 mb-2 text-sm">{message}</div>
      
      {/* Tags */}
      <div className="flex gap-2 flex-wrap mt-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-blue-50 text-blue-400 px-2 py-0.5 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
