import { toast } from "react-toastify";
const BASE_URL = "http://localhost:3000/api";

// export const getLists = async (token, boardId) => {
//   const res = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return await res.json();
// };

export const getLists = async (token, boardId) => {
  try {
    const res = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to fetch lists");
    }

    return data;
  } catch (err) {
    toast.error("Network error while fetching lists");
    throw err;
  }
};


export const createList = async (token, boardId, listData) => {
  try {
    const res = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(listData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("List created successfully!");
    } else {
      toast.error(data.message || "Failed to create list");
    }

    return data;
  } catch (err) {
    toast.error("Network error while creating list");
    throw err;
  }
};





export const updateList = async (token, listId, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("List updated");
    } else {
      toast.error(data.message || "Failed to update list");
    }

    return data;
  } catch (err) {
    toast.error("Network error while updating list");
    throw err;
  }
};

export const deleteList = async (token, listId) => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("List deleted");
    } else {
      toast.error(data.message || "Failed to delete list");
    }

    return data;
  } catch (err) {
    toast.error("Network error while deleting list");
    throw err;
  }
};
