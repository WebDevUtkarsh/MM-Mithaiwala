const calculateCartTotal = (cart, productMap) => {
  let subTotal = 0;
  let gstTotal = 0;

  cart.items.forEach((item) => {
    const product = productMap[item.productId.toString()];
    const variant = product.variants.find((v) => v.name === item.variantName);
    const price = variant ? variant.price : product.basePrice;

    const itemTotal = price * item.quantity;
    const itemGST = (itemTotal * product.gstRate) / 100;

    subTotal += itemTotal;
    gstTotal += itemGST;
  });

  const total = subTotal + gstTotal + cart.deliveryCharge;

  return {
    subTotal,
    gstTotal,
    deliveryCharge: cart.deliveryCharge,
    total,
  };
};

export default calculateCartTotal;