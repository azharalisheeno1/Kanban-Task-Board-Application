const BASE_URL = "http://localhost:3000/api";
import { toast } from "react-toastify";

export const getBoards = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to fetch boards");
    }

    return data;
  } catch (err) {
    toast.error("Network error while fetching boards");
    throw err;
  }
};

// export const createBoard = async (token, boardData) => {
//   const res = await fetch(`${BASE_URL}/boards`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(boardData),
//   });
//   return await res.json();
// };

export const createBoard = async (token, boardData) => {
  try {
    const res = await fetch(`${BASE_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(boardData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Board created successfully!");
    } else {
      toast.error(data.message || "Failed to create board");
    }

    return data;
  } catch (err) {
    toast.error("Network error while creating board");
    throw err;
  }
};
export const updateBoard = async (token, boardId, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/boards/${boardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Board updated");
    } else {
      toast.error(data.message || "Failed to update board");
    }

    return data;
  } catch (err) {
    toast.error("Network error while updating board");
    throw err;
  }
};

export const deleteBoard = async (token, boardId) => {
  try {
    const res = await fetch(`${BASE_URL}/boards/${boardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Board deleted");
    } else {
      toast.error(data.message || "Failed to delete board");
    }

    return data;
  } catch (err) {
    toast.error("Network error while deleting board");
    throw err;
  }
};
