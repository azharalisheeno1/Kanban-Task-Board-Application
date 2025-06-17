export const initialState = {
  boards: [],
  lists: [],
  cards: {},
};

export const kanbanReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOARDS":
      return { ...state, boards: action.payload };
    case "ADD_BOARD":
      return { ...state, boards: [...state.boards, action.payload] };
    case "UPDATE_BOARD":
      return {
        ...state,
        boards: state.boards.map((b) =>
          b._id === action.payload._id ? action.payload : b
        ),
      };
    case "DELETE_BOARD":
      return {
        ...state,
        boards: state.boards.filter((b) => b._id !== action.payload),
      };
    // ... same for LIST and CARD actions
    
    case "SET_LISTS":
      return { ...state, lists: action.payload };
    case "ADD_LIST":
      return { ...state, lists: [...state.lists, action.payload] };
    case "UPDATE_LIST":
      return {
        ...state,
        lists: state.lists.map((l) =>
          l._id === action.payload._id ? action.payload : l
        ),
      };
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((l) => l._id !== action.payload),
      };

    case "SET_CARDS":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listId]: action.payload.cards,
        },
      };
    case "ADD_CARD":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listId]: [
            ...(state.cards[action.payload.listId] || []),
            action.payload.card,
          ],
        },
      };
    case "UPDATE_CARD":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listId]: state.cards[action.payload.listId].map(
            (card) =>
              card._id === action.payload.card._id ? action.payload.card : card
          ),
        },
      };
    case "DELETE_CARD":
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listId]: state.cards[action.payload.listId].filter(
            (card) => card._id !== action.payload.cardId
          ),
        },
      };
    case "MOVE_CARD":
      const { card, sourceListId, targetListId } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [sourceListId]: state.cards[sourceListId].filter(
            (c) => c._id !== card._id
          ),
          [targetListId]: [...(state.cards[targetListId] || []), card],
        },
      };
    default:
      return state;
  }
};
