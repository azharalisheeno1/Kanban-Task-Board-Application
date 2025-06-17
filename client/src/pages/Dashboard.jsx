
import { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";

import ListColumn from "@/components/list/ListColumn";
import ListForm from "@/components/list/ListForm";

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import InviteForm from "@/components/inviteuser/InviteForm";
import { useKanban } from "@/store/kanban/KanbanContext";

const Dashboard = () => {
  const { activeBoardId, fetchBoards, lists, cards, moveCard } = useKanban();
  
  useEffect(() => {
    fetchBoards();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const cardId = active.id;
    const sourceListId = findListIdForCard(cardId);
    const targetListId = over.data.current?.listId;

    if (sourceListId && targetListId && sourceListId !== targetListId) {
      moveCard(cardId, sourceListId, targetListId);
    }
  };

  const findListIdForCard = (cardId) => {
    for (const listId in cards) {
      if (cards[listId].some((card) => card._id === cardId)) {
        return listId;
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {/* ListForm always on top */}

        <div className="flex w-fit md:flex-row flex-col items-center gap-10">
            <ListForm boardId={activeBoardId} />
           <InviteForm boardId={activeBoardId}/>
        </div>

        {/* DnD wrapper */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lists.map((list) => (
              <ListColumn key={list._id} list={list} />
            ))}
          </div>
        </DndContext>
      </div>
   
    </div>
  );
};

export default Dashboard;
