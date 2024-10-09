const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const productModel = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  priceSale: { type: String, required: false },
  urlImage: { type: String, required: true },
  description: { type: String, required: true },
  hot: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: {
    type: {
      categoryId: { type: String, required: true },
      categoryName: { type: String, required: true },
    },
    _id: false, // Tắt tính năng tự động tạo _id cho subdocument
    required: true,
  },
});

module.exports =
  mongoose.models.product || mongoose.model("product", productModel);
