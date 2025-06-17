
import { useKanban } from '@/store/kanban/KanbanContext';
import { useState, useEffect } from 'react';


const BoardForm = ({ board }) => {
  const isEditing = !!board;
  const { createBoard, updateBoard } = useKanban();

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isEditing) {
      setTitle(board.title); // prefill for edit
    }
  }, [board]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEditing) {
      await updateBoard(board._id, { title });
    } else {
      await createBoard({ title });
    }

    setTitle('');
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-2 mr-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={isEditing ? "Edit Board Title" : "New Board Title"}
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${isEditing ? "bg-yellow-500" : "bg-blue-500"}`}
        >
          {isEditing ? "Update Board" : "Create Board"}
        </button>
      </form>
    </div>
  );
};

export default BoardForm;
