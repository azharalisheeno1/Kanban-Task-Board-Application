import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";

export const getCards = async (token, listId) => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to fetch cards");
    }

    return data;
  } catch (err) {
    toast.error("Network error while fetching cards");
    throw err;
  }
};



// Create
export const createCard = async (token, listId, cardData) => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Card created successfully!");
    } else {
      toast.error(data.message || "Failed to create card");
    }

    return data;
  } catch (err) {
    toast.error("Network error while creating card");
    throw err;
  }
};


// Update

export const updateCard = async (token, cardId, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Card updated");
    } else {
      toast.error(data.message || "Failed to update card");
    }

    return data;
  } catch (err) {
    toast.error("Network error while updating card");
    throw err;
  }
};


// Delete

export const deleteCard = async (token, cardId) => {
  try {
    const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Card deleted");
    } else {
      toast.error(data.message || "Failed to delete card");
    }

    return data;
  } catch (err) {
    toast.error("Network error while deleting card");
    throw err;
  }
};

// Move

export const moveCardApi = async (token, cardId, listId) => {
  try {
    const res = await fetch(`${BASE_URL}/cards/${cardId}/move`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Card moved");
    } else {
      toast.error(data.message || "Failed to move card");
    }

    return data;
  } catch (err) {
    toast.error("Network error while moving card");
    throw err;
  }
};
