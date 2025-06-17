const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth-middleware');
const validate = require("../middlewares/validate-middleware");
const { cardvalidation } = require("../validations/card-validation");

const {
  addCard,
  getCards,
  updateCard,
  deleteCard,
  moveCard,
} = require('../controllers/card-controller');

// Protect all routes
router.use(protect);

// Cards CRUD under a list
router.route("/lists/:listId/cards").post(validate(cardvalidation), addCard)
router.route("/lists/:listId/cards").get(getCards)


  // Update and delete specific card
router
  .route("/cards/:cardId")
  .put(validate(cardvalidation), updateCard)

  router.route("/cards/:cardId").delete(deleteCard)
// Move card to another list/position
router
  .route("/cards/:id/move")
  .put(moveCard);

module.exports = router;
