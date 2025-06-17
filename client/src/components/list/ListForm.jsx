
import { useKanban } from "@/store/kanban/KanbanContext";
import { useState } from "react";

const ListForm = ({boardId}) => {
  const [title, setTitle] = useState("");
  const { createList } = useKanban(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createList( boardId,{ title });
    setTitle("");
  };

  return (
    <div >
      <input
        type="text"
        className="border p-2 mr-2 bg-white rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter List Title"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-3 py-2 font-semibold rounded"
      >
        Add List
      </button>
    </div>
  );
};

export default ListForm;

