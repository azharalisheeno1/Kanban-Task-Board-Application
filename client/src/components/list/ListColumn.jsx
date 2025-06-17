
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CardForm from "../card/CardForm";

import { CardItem } from "../card/CardItem";
import { useDroppable } from "@dnd-kit/core";
import { useKanban } from "@/store/kanban/KanbanContext";

const ListColumn = ({ list }) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const { cards, fetchCards, updateList, deleteList } = useKanban();

  useEffect(() => {
    fetchCards(list._id);
  }, [list._id]);

  const handleUpdate = async () => {
    await updateList(list._id, { title });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteList(list._id);
  };

  const { setNodeRef } = useDroppable({
    id: list._id,
    data: { listId: list._id },
  });

  const listCards = cards[list._id] || [];

  return (
    <div ref={setNodeRef} className="min-w-[250px] bg-white rounded p-4 shadow">
      {isEditing ? (
        <>
          <input
            className="border p-1 mb-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-2 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{title}</h3>
          <div className="flex gap-1">
            <button onClick={() => setIsEditing(true)} className="text-sm text-blue-500">
              <FiEdit2 />
            </button>
            <button onClick={handleDelete} className="text-sm text-red-500">
              <FiTrash2 />
            </button>
          </div>
        </div>
      )}

      {listCards.map((card) => (
        <CardItem key={card._id} card={card} listId={list._id} />
      ))}

      <CardForm listId={list._id} />
    </div>
  );
};

export default ListColumn;
