export const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: "",
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
        loading: false,
        error: "",
      };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...initialState, token: null, user: null };
    default:
      return state;
  }
};
