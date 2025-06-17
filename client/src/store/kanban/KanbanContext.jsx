import { createContext, useContext, useReducer, useState } from "react";
import { kanbanReducer, initialState } from "./kanbanReducer";
import {
  getBoards,
  createBoard as createBoardApi,
  updateBoard as updateBoardApi,
  deleteBoard as deleteBoardApi,
} from "../../api/board";

import {
  getLists,
  createList as createListApi,
  updateList as updateListApi,
  deleteList as deleteListApi,
} from "../../api/list";

import {
  getCards,
  moveCardApi,
  createCard as createCardApi,
  updateCard as updateCardApi,
  deleteCard as deleteCardApi,
} from "../../api/cards";

import { useAuth } from "../auth/useAuth";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(kanbanReducer, initialState);
  const [activeBoardId, setActiveBoardId] = useState(null);



  // ---------------------- BOARDS ----------------------
  const fetchBoards = async () => {
    const data = await getBoards(token);
    dispatch({ type: "SET_BOARDS", payload: data });
  };

  const createBoard = async (boardData) => {
    const data = await createBoardApi(token, boardData);
    dispatch({ type: "ADD_BOARD", payload: data });
  };

  const updateBoard = async (boardId, updateData) => {
    const data = await updateBoardApi(token, boardId, updateData);
    dispatch({ type: "UPDATE_BOARD", payload: data });
  };

  const deleteBoard = async (boardId) => {
    await deleteBoardApi(token, boardId);
    dispatch({ type: "DELETE_BOARD", payload: boardId });
  };

  // ---------------------- LISTS ----------------------
  const fetchLists = async (boardId) => {
    const data = await getLists(token, boardId);
    dispatch({ type: "SET_LISTS", payload: data });
  };

  const createList = async (boardId, listData) => {
    const data = await createListApi(token, boardId, listData);
    dispatch({ type: "ADD_LIST", payload: data });
  };

  const updateList = async (listId, updateData) => {
    const data = await updateListApi(token, listId, updateData);
    dispatch({ type: "UPDATE_LIST", payload: data });
  };

  const deleteList = async (listId) => {
    await deleteListApi(token, listId);
    dispatch({ type: "DELETE_LIST", payload: listId });
  };

  // ---------------------- CARDS ----------------------
  const fetchCards = async (listId) => {
    const data = await getCards(token, listId);
    dispatch({
      type: "SET_CARDS",
      payload: { listId, cards: data },
    });
  };

  const fetchAllCards = async (lists) => {
    const promises = lists.map((list) =>
      getCards(token, list._id).then((cards) => ({
        listId: list._id,
        cards,
      }))
    );
    const results = await Promise.all(promises);
    results.forEach(({ listId, cards }) => {
      dispatch({ type: "SET_CARDS", payload: { listId, cards } });
    });
  };

  const createCard = async (listId, cardData) => {
    const data = await createCardApi(token, listId, cardData);
    dispatch({ type: "ADD_CARD", payload: { listId, card: data } });
  };

  const updateCard = async (listId, cardId, updateData) => {
    const data = await updateCardApi(token, cardId, updateData);
    dispatch({ type: "UPDATE_CARD", payload: { listId, card: data } });
  };

  const deleteCard = async (listId, cardId) => {
    await deleteCardApi(token, cardId);
    dispatch({ type: "DELETE_CARD", payload: { listId, cardId } });
  };

  const moveCard = async (cardId, sourceListId, targetListId) => {
    const data = await moveCardApi(token, cardId, targetListId);
    dispatch({
      type: "DELETE_CARD",
      payload: { listId: sourceListId, cardId },
    });
    dispatch({
      type: "ADD_CARD",
      payload: { listId: targetListId, card: data },
    });
  };

  return (
    <KanbanContext.Provider
      value={{
        ...state,
        fetchBoards,
        createBoard,
        updateBoard,
        deleteBoard,
        fetchLists,
        createList,
        updateList,
        deleteList,
        fetchCards,
        fetchAllCards,
        createCard,
        updateCard,
        deleteCard,
        moveCard,
        activeBoardId,
        setActiveBoardId,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => useContext(KanbanContext);
