const Board = require("../models/board-model");

const isBoardOwner = async (req, res, next) => {
  const boardId = req.params.id;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (board.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this board" });
    }
    req.board = board;
    next(); 
  } catch (err) {
    console.error("isBoardOwner error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = isBoardOwner;
