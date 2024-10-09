//connect collection cate
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const categorySchema = new Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.models.category || mongoose.model('category', categorySchema);