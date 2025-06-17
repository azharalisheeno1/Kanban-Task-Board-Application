const {Schema,model} = require('mongoose');

const cardSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  listId: { type: Schema.Types.ObjectId, ref: 'List' },
  position: Number,
}, { timestamps: true });

module.exports =model('Card', cardSchema);
