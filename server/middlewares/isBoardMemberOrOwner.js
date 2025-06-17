const Board = require("../models/board-model");

const isBoardMemberOrOwner = async (req, res, next) => {
  const board = await Board.findById(req.params.boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  const userId = req.user.id;
  const isOwner = board.owner.toString() === userId;
  const isMember = board.members.map(String).includes(userId);

  if (!isOwner && !isMember) {
    return res.status(403).json({ message: "Access denied" });
  }

  req.board = board;
  next();
};

module.exports = isBoardMemberOrOwner;
