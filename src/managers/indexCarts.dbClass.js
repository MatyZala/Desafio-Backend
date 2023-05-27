import mongoose from "mongoose";
import cartModel from "./carts.model.js";
import productModel from "./products.model.js";
class Carts {
  static idUnico = 100;
  constructor() {
    this.status = 0;
    this.statusMsg = "Iniciado";
  }
  checkStatus = () => {
    return this.status;
  };

  showStatusMsg = () => {
    return this.statusMsg;
  };
  static #objEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  addCart = async () => { //modificado
    try {
        await cartModel.create({ products: [] });
        this.status = 1;
        this.statusMsg = "Carrito registrado en la base de datos";
    } catch (err) {
      this.status = -1;
      this.statusMsg = `addCart: ${err}`;
    }
  };
  getCarts = async () => {//modificado
    try {
      const carts = await cartModel.find().populate('products.idProduct');
      this.status = 1;
      return carts;
    } catch (err) {
      this.status = -1;
      this.statusMsg = `getCarts: ${err}`;
    }
  };
  deleteCarts = async (id) => {
    try {
      const eliminador = await cartModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      this.status = 1;
      eliminador.deletedCount === 0
        ? (this.statusMsg = "El ID no existe")
        : (this.statusMsg = "Carrito eliminado");
    } catch (err) {
      this.status = -1;
      this.statusMsg = `deleteCarts: ${err}`;
    }
  };
  getCartsById = async (cartId) => { //modificado
    const cart = await cartModel.findById(cartId).populate("products.idProduct");
    if (!cart) {
      return null;
    } else {
      //   const products = await cart.populate("products");
      return cart;
    }
  };
//   

addProductToCart = async (cartId, productId) => { //modificado
    try {
      const product = await productModel.findById(productId);
  
      if (!product) {
        return { status: "ERROR", message: "El producto no existe" };
      }

      const cart = await cartModel.findById(cartId)
      let flag = false
      cart.products.forEach( async p => {
        if (p.idProduct.toString() === productId && !flag) {
        p.quantity++
        flag = true
        await cart.save()
      }
    })
    if(flag){
      return { status: "OK", message: "Aumento de cantidad" }
    }

      cart.products.push({idProduct: productId})

      await cart.save()
      return { status: "OK", message: "Producto agregado al carrito" };
    } catch (error) {
      throw error;
    }
  }
}

export default Carts;
