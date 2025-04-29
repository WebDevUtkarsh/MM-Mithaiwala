import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import calculateCartTotal from "../utils/calculate.cartTotal.js";

export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ item: [], total: 0 });

    const productIds = cart.items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const productMap = {};
    products.forEach(p => {
        productMap[p._id.toString()] = p;
    });

    const totals = calculateCartTotal(cart, productMap);

    res.json({ ...cart.toObject(), totals });
}

export const addToCart = async (req, res) => {
    const { productId, variantName, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({ user: req.user.id, items: [], deliveryCharge: 50 });
    }

    const itemIndex = cart.items.findIndex(
        (i) => i.productId.toString() === productId && i.variantName === variantName
    );

    if (itemIndex > -1) { 
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, variantName, quantity });
    }

    await cart.save();
    res.status(201).json({ message: 'Item added to cart' });
}

export const removeFromCart = async (req, res) => {
    const { productId, variantName } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(
    (item) =>
      !(item.productId.toString() === productId && item.variantName === variantName)
  );

  await cart.save();
  res.json({ message: 'Item removed from cart' });
}