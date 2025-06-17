
import { useKanban } from '@/store/kanban/KanbanContext';
import { useState } from 'react';


const CardForm = ({ listId }) => {
  const [title, setTitle] = useState('');
  const { createCard } = useKanban(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createCard(listId, { title });
      setTitle('');
    } catch (err) {
      console.error("Error creating card:", err.message);
    }
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-1 mr-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Card Title"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-2 py-1 mt-1 rounded w-full"
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default CardForm;
