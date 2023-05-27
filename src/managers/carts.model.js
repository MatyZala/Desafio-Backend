import mongoose from "mongoose";
mongoose.pluralize(null);
const collection = "carts";

const schema = new mongoose.Schema({//modificado
  products: [{
    idProduct:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },
    quantity: { type: Number, default: 1 }
}]
});

const cartModel = mongoose.model(collection, schema);
export default cartModel;
