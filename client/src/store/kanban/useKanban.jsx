import { useContext } from "react";
import { KanbanContext } from "./KanbanContext";

export const useKanban = () => useContext(KanbanContext);
