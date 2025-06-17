const List = require("../models/list-model");

// Create a new list for a board
const addList = async (req, res) => {
  try {
    const { title } = req.body;
    const list = await List.create({ title, boardId: req.params.boardId });
    res.status(201).json(list);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create list", error: err.message });
  }
};

// Get all lists for a board
const getLists = async (req, res) => {
  try {
    const lists = await List.find({ boardId: req.params.boardId });
    res.json(lists);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get lists", error: err.message });
  }
};

// Update a list title
const updateList = async (req, res) => {
  try {
    const { title } = req.body;
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      { title },
      { new: true }
    );
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update list", error: err.message });
  }
};

// Delete a list
const deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.listId);
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json({ message: "List deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete list", error: err.message });
  }
};

module.exports = {
  addList,
  getLists,
  updateList,
  deleteList,
};
