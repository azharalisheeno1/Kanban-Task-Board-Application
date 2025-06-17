import { HiViewBoards } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BoardForm from "../board/BoardForm";
import { useEffect } from "react";
import { useKanban } from "@/store/kanban/KanbanContext";


const Sidebar = () => {
  const { boards, setActiveBoardId, fetchLists, activeBoardId, deleteBoard } =useKanban();

  const handleBoardClick = (boardId) => {
    setActiveBoardId(boardId);
    fetchLists(boardId);
  };
const handleDeleteBoard = async (boardId) => {
  await deleteBoard(boardId);

  if (activeBoardId === boardId) {
    const remainingBoards = boards.filter((b) => b._id !== boardId);
    if (remainingBoards.length) {
      const newActive = remainingBoards[0];
      setActiveBoardId(newActive._id);
      fetchLists(newActive._id);
    }
  }
};



  useEffect(() => {
    if (boards.length > 0 && !activeBoardId) {
      const firstBoardId = boards[0]._id;
      setActiveBoardId(firstBoardId);
      fetchLists(firstBoardId);
    }
  }, [boards, activeBoardId, setActiveBoardId, fetchLists]);

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-white border-r shadow-sm p-4 block">
      <h2 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-2">
        <HiViewBoards className="text-indigo-500 w-5 h-5" />
         Boards
      </h2>

      <ul className="space-y-2">
        {boards.map((b) => (
          <li
            key={b._id}
            className="flex items-center justify-between group hover:bg-indigo-50 rounded-md"
          >
            {/* Board title button */}
            <button
              onClick={() => handleBoardClick(b._id)}
              className={`flex-1 text-left px-3 py-2 rounded-md transition ${
                activeBoardId === b._id
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-800 hover:bg-indigo-100 hover:text-indigo-700"
              }`}
            >
              {b.title}
            </button>

            {/* Edit Dialog Button */}
            <Dialog>
              <DialogTrigger className="p-1 text-sm text-gray-500 hover:text-indigo-600">
                <FiEdit2 />
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>Edit Board</DialogTitle>
                </DialogHeader>
                <BoardForm board={b} />
              </DialogContent>
            </Dialog>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteBoard(b._id)}
              className="p-1 text-sm text-gray-500 hover:text-red-600"
            >
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>

      {/* Create Board Button */}
      <Dialog>
        <DialogTrigger className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded w-full text-center">
       Create Board
        </DialogTrigger>

        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <BoardForm />
        </DialogContent>
      </Dialog>
      
    </aside>
  );
};

export default Sidebar;
