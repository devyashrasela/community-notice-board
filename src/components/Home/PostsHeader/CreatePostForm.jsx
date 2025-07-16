import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../Redux/Reducers/PostsReducer";
import { UserSelector } from "../../../../Redux/Reducers/UserRedicer";
import { generateWithGemini } from "../../../Services/geminiService";
import { AiOutlineClose } from "react-icons/ai";
import { BsStars, BsLightning } from "react-icons/bs";
import { RiSparklingFill } from "react-icons/ri";
import { ImSpinner2 } from "react-icons/im";

/* -------- colour presets -------- */
const variantMap = {
  notice: {
    lightBg: "bg-yellow-50/60",
    border: "border-yellow-200",
    text: "text-yellow-800",
    btn: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500"
  },
  post: {
    lightBg: "bg-blue-50/60",
    border: "border-blue-200",
    text: "text-blue-800",
    btn: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
  },
  event: {
    lightBg: "bg-green-50/60",
    border: "border-green-200",
    text: "text-green-800",
    btn: "bg-green-500 hover:bg-green-600 focus:ring-green-500"
  }
};

export default function CreatePostForm({ type = "post", onClose, onSubmit }) {
  const dispatch = useDispatch();
  const user = useSelector(UserSelector);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    tags: [],
    image: "",
    eventDate: "",
    location: "",
    organizer: user?.name || ""
  });
  const [newTag, setNewTag] = useState("");
  const [showGemini, setShowGemini] = useState(false);
  const [geminiPrompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const v = variantMap[type] ?? variantMap.post;
  const nice = type[0].toUpperCase() + type.slice(1);
  const isEvt = type === "event";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    const t = newTag.trim();
    if (t && !formData.tags.includes(t)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, t] }));
    }
    setNewTag("");
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const openGemini = (field) => {
    setActiveField(field);
    setShowGemini(true);
    setError("");
  };

  const closeGemini = () => {
    setShowGemini(false);
    setPrompt("");
    setError("");
    setActiveField("");
  };

  const askGemini = async () => {
    if (!geminiPrompt.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const generatedText = await generateWithGemini(geminiPrompt, activeField);
      setFormData(prev => ({ ...prev, [activeField]: generatedText }));
      setShowGemini(false);
      setPrompt("");
      setActiveField("");
    } catch (err) {
      console.error("Gemini generation error:", err);
      setError(err.message || "Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (type === 'post' && !formData.content.trim()) {
      setError('Content is required for posts');
      return false;
    }
    
    if (type !== 'post' && !formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    
    if (type === 'event') {
      if (!formData.eventDate) {
        setError('Event date is required');
        return false;
      }
      if (!formData.location.trim()) {
        setError('Location is required for events');
        return false;
      }
      if (!formData.organizer.trim()) {
        setError('Organizer is required for events');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError("");
    
    try {
      if (!user || !user.name) {
        setError('User information is missing. Please refresh and try again.');
        return;
      }

      const postData = {
        type,
        userName: user.name,
        userImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`,
        date: new Date().toISOString(),
        tags: formData.tags,
        image: formData.image,
        title: formData.title,
        ...(type === 'post' && { content: formData.content }),
        ...(type !== 'post' && { description: formData.description }),
        ...(type === 'event' && {
          eventDate: formData.eventDate,
          location: formData.location,
          organizer: formData.organizer,
        }),
        liked: false,
        saved: false,
      };

      await dispatch(addPost(postData));
      onSubmit?.(postData);
      onClose();
      
      console.log("Post created successfully:", postData);
      
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (showGemini) {
        closeGemini();
      } else {
        onClose();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl bg-white shadow-xl backdrop-blur-md">
        
        {/* --- HEADER --- */}
        <div className={`px-6 py-4 border-b ${v.lightBg} ${v.border} rounded-t-xl backdrop-blur-sm`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <RiSparklingFill className={`text-2xl ${v.text}`} />
              <h2 className={`text-lg font-semibold ${v.text}`}>Create {nice}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <AiOutlineClose size={20}/>
            </button>
          </div>
        </div>

        {/* --- GEMINI BAR --- */}
        {showGemini && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-100/70 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <BsStars className="text-purple-600"/> 
              <span className="font-medium">Ask Gemini for {activeField}</span>
              <button 
                onClick={closeGemini}
                className="ml-auto p-1 rounded hover:bg-gray-200 transition-colors"
                aria-label="Close Gemini"
              >
                <AiOutlineClose size={16}/>
              </button>
            </div>
            
            {error && (
              <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex gap-2">
              <input
                className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={`Describe what you want for the ${activeField}...`}
                value={geminiPrompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !loading && askGemini()}
                disabled={loading}
              />
              <button
                disabled={loading || !geminiPrompt.trim()}
                onClick={askGemini}
                className={`flex items-center gap-1 px-4 py-2 text-white rounded ${v.btn} disabled:opacity-50 transition-all`}
              >
                {loading ? <ImSpinner2 className="animate-spin"/> : <BsLightning/>}
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        )}

        {/* --- FORM --- */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          
          {/* Error display */}
          {error && !showGemini && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {/* Title with Gemini */}
          <Field lbl="Title *" cls={v.text}>
            <div className="relative">
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title..."
                disabled={isSubmitting}
              />
              <button 
                type="button" 
                onClick={() => openGemini('title')}
                className="absolute right-2 top-2 p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors"
                disabled={isSubmitting}
                aria-label="Generate title with AI"
              >
                <BsStars size={16}/>
              </button>
            </div>
          </Field>

          {/* Content/Description with Gemini */}
          <Field lbl={type === "post" ? "Content *" : "Description *"} cls={v.text}>
            <div className="relative">
              <textarea
                required
                rows={4}
                name={type === "post" ? "content" : "description"}
                value={type === "post" ? formData.content : formData.description}
                onChange={handleInputChange}
                className="w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                placeholder={`Enter ${type === "post" ? "content" : "description"}...`}
                disabled={isSubmitting}
              />
              <button 
                type="button" 
                onClick={() => openGemini(type === "post" ? "content" : "description")}
                className="absolute right-2 top-2 p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors"
                disabled={isSubmitting}
                aria-label={`Generate ${type === "post" ? "content" : "description"} with AI`}
              >
                <BsStars size={16}/>
              </button>
            </div>
          </Field>

          {/* Event fields */}
          {isEvt && (
            <div className="grid md:grid-cols-2 gap-4">
              <Field lbl="Event Date *" cls={v.text}>
                <input
                  required
                  type="datetime-local"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </Field>
              <Field lbl="Location *" cls={v.text}>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location..."
                  disabled={isSubmitting}
                />
              </Field>
              <Field lbl="Organizer *" cls={v.text}>
                <input
                  required
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Organizer name"
                  disabled={isSubmitting}
                />
              </Field>
            </div>
          )}

          <Field lbl="Image URL" cls={v.text}>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </Field>

          {/* TAGS */}
          <Field lbl="Tags" cls={v.text}>
            <div className="flex gap-2 mb-2">
              <input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add tag"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
                disabled={!newTag.trim() || isSubmitting}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span key={tag} className={`flex items-center gap-1 px-3 py-1 rounded border ${v.border} ${v.lightBg}`}>
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)} 
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={isSubmitting}
                    aria-label={`Remove ${tag} tag`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </Field>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2 rounded border hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting || loading}
              className={`px-6 py-2 text-white rounded ${v.btn} disabled:opacity-50 flex items-center gap-2 transition-all`}
            >
              {isSubmitting ? (
                <>
                  <ImSpinner2 className="animate-spin" size={16} />
                  Creating...
                </>
              ) : (
                `Create ${nice}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Field = ({ lbl, children, cls }) => (
  <div className="space-y-1">
    <label className={`text-sm font-medium ${cls}`}>{lbl}</label>
    {children}
  </div>
);
