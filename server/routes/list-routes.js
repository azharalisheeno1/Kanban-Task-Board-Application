const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth-middleware");
const validate = require("../middlewares/validate-middleware");
const { listvalidation } = require("../validations/list-validation");
const {
  addList,
  getLists,
  updateList,
  deleteList,
} = require("../controllers/list-controller");
const isBoardMemberOrOwner = require("../middlewares/isBoardMemberOrOwner");
router.use(protect);
router
  .route("/boards/:boardId/lists")
  .post(isBoardMemberOrOwner, validate(listvalidation), addList)
  .get(isBoardMemberOrOwner, getLists);

router.route("/lists/:listId").put(validate(listvalidation), updateList);

router.route("/lists/:listId").delete(deleteList); 

module.exports = router;
