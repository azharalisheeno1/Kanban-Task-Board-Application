import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { loginUser, registerUser, fetchCurrentUser } from "./authApi";
import { authReducer, initialState } from "./authReducers";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [authForm, setAuthForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setAuthForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const token = await loginUser(authForm.email, authForm.password);
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const register = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      await registerUser(authForm);
      return true;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const fetchUser = async () => {
    if (!state.token) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const user = await fetchCurrentUser(state.token);
      dispatch({ type: "SET_USER", payload: user });
      localStorage.setItem("user", JSON.stringify(user));
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (state.token && !state.user) fetchUser();
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authForm,
        handleFormChange,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
