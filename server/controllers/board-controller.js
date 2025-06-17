const Board = require("../models/board-model");
const User = require("../models/userModel");

const getBoards = async (req, res) => {
  const boards = await Board.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  });
  res.json(boards);
};

const createBoard = async (req, res) => {
  const { title } = req.body;
  const board = await Board.create({ title, owner: req.user._id });
  res.status(201).json(board);
};
const updateBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board || board.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  board.title = req.body.title || board.title;
  await board.save();
  res.json(board);
};

const deleteBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);
  await board.deleteOne();
  res.json({ message: "Board deleted" });
};
const inviteUser = async (req, res) => {
  const { email } = req.body;
  const boardId = req.params.id;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    // Check if current user is the board owner
    if (board.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the board owner can invite users" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user already has access
    const isAlreadyMember =
      board.members.includes(user._id) ||
      board.owner.toString() === user._id.toString();

    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ message: "User already has access to this board" });
    }

    // Add user to board members
    board.members.push(user._id);
    await board.save();

    res
      .status(200)
      .json({ message: "User invited successfully", invitedUserId: user._id });
  } catch (err) {
    console.error("Invite Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBoards,
  createBoard,
  inviteUser,
  updateBoard,
  deleteBoard,
};
