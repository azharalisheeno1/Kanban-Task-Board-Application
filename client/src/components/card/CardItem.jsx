

import { useKanban } from "@/store/kanban/KanbanContext";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";


export const CardItem = ({ card, listId }) => {
  const { updateCard, deleteCard } = useKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: card._id,
    data: {
      card,
      fromListId: listId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = async () => {
    await updateCard(listId, card._id, { title });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteCard(listId, card._id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-2 rounded shadow mb-2 cursor-move"
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 w-full mb-1"
          />
          <button
            onClick={handleUpdate}
            className="bg-indigo-500 text-white text-sm px-2 py-1 mr-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white text-sm px-2 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{card.title}</p>
          <div className="flex gap-1 mt-1">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-blue-500"
            >
              <FiEdit2 size={15} />
            </button>
            <button
              onClick={handleDelete}
              className="text-xs text-red-500"
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
