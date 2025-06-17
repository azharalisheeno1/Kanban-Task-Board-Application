const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth-middleware");
const validate = require("../middlewares/validate-middleware");
const { boardvalidation } = require("../validations/board-validation");
const {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  inviteUser,
} = require("../controllers/board-controller");

const isBoardOwner = require("../middlewares/isBoardOwner");

router.route("/").get(protect, getBoards);

router.route("/").post(protect, validate(boardvalidation), createBoard);

router.route("/:id").put(protect, updateBoard);

router.route("/:id").delete(protect, deleteBoard);

router.route("/:id/invite").post(protect, isBoardOwner, inviteUser);

module.exports = router;
