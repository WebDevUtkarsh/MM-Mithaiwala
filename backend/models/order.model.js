import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    variantName: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    gstAmount: { type: String, required: true },
})

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    subTotal: { type: String, required: true, },
    gstTotal: { type: String, required: true, },
    deliveryCharge: { type: String, required: true, },
    total: { type: String, required: true, },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    isDelivered: { type: Boolean, default: false, },
    invoiceId: { type: String },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;