const Card = require("../models/card-model");

// Create a new card in a list
const addCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const card = await Card.create({
      title,
      description,
      listId: req.params.listId,
      position: 0, // Default position, can be improved later
    });
    res.status(201).json(card);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create card", error: err.message });
  }
};

// Get all cards from a list
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ listId: req.params.listId }).sort(
      "position"
    );
    res.json(cards);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch cards", error: err.message });
  }
};

// Update a card (title or description)
const updateCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { title, description },
      { new: true }
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update card", error: err.message });
  }
};

// Delete a card
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete card", error: err.message });
  }
};

// Move a card to a different list/position
const moveCard = async (req, res) => {
  try {
    const { listId, position } = req.body;
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    card.listId = listId;
    card.position = position;
    await card.save();

    res.json(card);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to move card", error: err.message });
  }
};

module.exports = {
  addCard,
  getCards,
  updateCard,
  deleteCard,
  moveCard,
};
