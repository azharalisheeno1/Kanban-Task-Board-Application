const {Schema,model} = require('mongoose');

const listSchema = new Schema({
  title: { type: String, required: true },
  boardId: { type:Schema.Types.ObjectId, ref: 'Board' },
}, { timestamps: true });

module.exports = model('List', listSchema);
