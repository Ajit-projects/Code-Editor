import { Trash2Icon, UserIcon, Edit2Icon } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";
import CommentContent from "./CommentContent";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    _creationTime: number;
    updatedAt?: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    content: string;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  onUpdate: (commentId: Id<"snippetComments">, content: string) => void;
  isDeleting: boolean;
  isUpdating: boolean;
  currentUserId?: string;
}

function Comment({
  comment,
  currentUserId,
  isDeleting,
  isUpdating,
  onDelete,
  onUpdate,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const isOwner = comment.userId === currentUserId;

  const handleSave = () => {
    if (!editedContent.trim()) return;
    onUpdate(comment._id, editedContent.trim());
    setIsEditing(false);
  };

  return (
    <div className="group">
      <div
        className={`bg-[#0a0a0f] rounded-xl p-6 border transition-all duration-200 ease-in-out
    ${isOwner ? "border-blue-500/40 bg-blue-500/5" : "border-[#ffffff0a] hover:border-[#ffffff14]"}
    ${isEditing ? "border-yellow-500 bg-yellow-500/5 shadow-lg" : ""}
  `}
      >
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ffffff08] flex items-center justify-center shrink-0">
              <UserIcon className="w-4 h-4 text-[#808086]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[#e1e1e3] font-medium truncate">
                {comment.userName}
              </span>

              <span className="block text-sm text-[#808086]">
                {new Date(comment._creationTime).toLocaleDateString()}
                {comment.updatedAt && (
                  <span className="ml-2 italic text-xs text-[#6b7280]">
                    • edited {new Date(comment.updatedAt).toLocaleString()}
                  </span>
                )}
              </span>
            </div>
          </div>

          {isOwner && !isEditing && (
            <div className="flex items-center gap-2
                opacity-70
                sm:opacity-0
                sm:group-hover:opacity-100
                transition-all">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-blue-500/10 rounded-lg"
                title="Edit comment"
              >
                <Edit2Icon className="w-4 h-4 text-blue-400" />
              </button>

              <button
                onClick={() => onDelete(comment._id)}
                disabled={isDeleting}
                className="p-2 hover:bg-red-500/10 rounded-lg"
                title="Delete comment"
              >
                <Trash2Icon className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              className="w-full bg-[#111117] border border-[#ffffff14] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.content);
                }}
                className="px-4 py-1.5 text-sm bg-[#ffffff0a] rounded-lg text-[#e1e1e3] cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={isUpdating || !editedContent.trim()}
                className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white cursor-pointer 
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <CommentContent content={comment.content} />
        )}
      </div>
    </div>
  );
}
export default Comment;