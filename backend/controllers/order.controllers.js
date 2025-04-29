import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import calculateCartTotal from "../utils/calculate.cartTotal.js";
import User from "../models/user.model.js"; // if not already imported
import { v4 as uuidv4 } from 'uuid';
import generateInvoice from "../utils/generate.invoice.js";
import sendInvoiceEmail from "../utils/sendInvoiceEmail.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const placeOrder = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      const productIds = cart.items.map((i) => i.productId);
      const products = await Product.find({ _id: { $in: productIds } });
  
      const productMap = {};
      products.forEach((p) => {
        productMap[p._id.toString()] = p;
      });
  
      const orderItems = cart.items.map((item) => {
        const product = productMap[item.productId.toString()];
        const variant = product?.variants?.find(
          (v) => v.name === item.variantName
        );
  
        const unitPrice = variant ? Number(variant.price) : Number(product.basePrice || 0);
        const quantity = Number(item.quantity);
        const totalPrice = unitPrice * quantity;
        const gst = (totalPrice * Number(product.gstRate || 0)) / 100;
  
        return {
          productId: item.productId,
          variantName: item.variantName,
          quantity,
          price: totalPrice,
          gstAmount: gst,
        };
      });
  
      // Recalculate totals based on sanitized items
      const subTotal = orderItems.reduce((sum, item) => sum + item.price, 0);
      const gstTotal = orderItems.reduce((sum, item) => sum + item.gstAmount, 0);
      const deliveryCharge = 50; // Or configurable
      const total = subTotal + gstTotal + deliveryCharge;
  
      const newOrder = new Order({
        user: userId,
        items: orderItems,
        subTotal,
        gstTotal,
        deliveryCharge,
        total,
        paymentStatus: 'paid',
        invoiceId: uuidv4(),
      });
  
      await newOrder.save();
      await Cart.findOneAndDelete({ user: userId });

      const user = await User.findById(userId);

      const invoicePath = path.join(__dirname, '../../invoices', `${newOrder.invoiceId}.pdf`);
      await generateInvoice(newOrder, user, invoicePath);
      await sendInvoiceEmail(user.email, user.name, invoicePath, newOrder.invoiceId);
  
      res.status(201).json({ message: 'Order placed', order: newOrder });
  
    } catch (error) {
      console.error('Order placement error:', error);
      res.status(500).json({ message: 'Something went wrong while placing order' });
    }
}