import PDFDocument from 'pdfkit';
import fs from 'fs';
import axios from 'axios';
import path from 'path';

const generateInvoice = async (newOrder, user) => {
  const doc = new PDFDocument({ margin: 50 });
  const invoicePath = path.join('invoices', `invoice-${newOrder.invoiceId}.pdf`);
  const writeStream = fs.createWriteStream(invoicePath);
  doc.pipe(writeStream);

  // Load logo from URL
  const imageUrl = 'https://asset.cloudinary.com/drdpvaevq/9f84a56cb099fafd714dea0c74b79312';
const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(response.data, 'base64');

doc.image(imageBuffer, 50, 50, { width: 100 });

  // Company Info
  doc
    .fontSize(12)
    .text('MM Mithaiwala', 400, 50)
    .text('Address: Ground Floor, 3, Vasanti Bhavan, Anand Road, Malad (West)', 400, 65)
    .text('Mumbai, Maharashtra 400064', 400, 80)
    .text('Phone: +91 8655467137', 400, 95)
    .text('Email: sales@mmmithaiwala.in', 400, 110);

  doc.moveDown(3);

  // Customer and Invoice Info
  doc
    .fontSize(16)
    .text('INVOICE', 50, 160);

  doc
    .fontSize(10)
    .text(user.name, 50, 185)
    .text(user.address || 'Shipping Address Line', 50, 200)
    .text(user.city || '', 50, 215)
    .text(user.state || '', 50, 230)
    .text(user.email, 50, 245)
    .text(user.phone || '', 50, 260);

  doc
    .font('Helvetica-Bold')
    .text('Ship To:', 250, 185)
    .font('Helvetica')
    .text(user.name, 250, 200)
    .text(user.address || '', 250, 215)
    .text(user.city || '', 250, 230)
    .text(user.state || '', 250, 245);

  doc
    .text(`Invoice Number: ${newOrder.invoiceId}`, 400, 185)
    .text(`Invoice Date: ${new Date(newOrder.createdAt).toLocaleDateString()}`, 400, 200)
    .text(`Order Number: ${newOrder.invoiceId}`, 400, 215)
    .text(`Order Date: ${new Date(newOrder.createdAt).toLocaleDateString()}`, 400, 230)
    .text(`Payment Method: ${newOrder.paymentMethod || 'Online'}`, 400, 245);

  doc.moveDown(3);

  // Table Headers
  const tableTop = 300;
  doc
    .font('Helvetica-Bold')
    .text('Product', 50, tableTop)
    .text('Quantity', 300, tableTop)
    .text('Price', 400, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // Products
  let i = 0;
  const itemSpacing = 25;

  newOrder.items.forEach(item => {
    const y = tableTop + 30 + i * itemSpacing;
    doc
      .font('Helvetica')
      .text(item.variantName, 50, y)
      .text(item.quantity.toString(), 300, y)
      .text(`₹ ${item.price.toFixed(2)}`, 400, y);
    i++;
  });

  const summaryY = tableTop + 30 + i * itemSpacing + 20;

  // Totals
  doc
    .font('Helvetica-Bold')
    .text(`Subtotal`, 400, summaryY)
    .text(`₹ ${newOrder.subTotal.toFixed(2)}`, 480, summaryY);

  doc
    .font('Helvetica-Bold')
    .text(`Shipping`, 400, summaryY + 15)
    .text(`₹ ${newOrder.deliveryCharge.toFixed(2)}`, 480, summaryY + 15);

  doc
    .font('Helvetica-Bold')
    .text(`Total`, 400, summaryY + 40)
    .text(`₹ ${newOrder.total.toFixed(2)} (includes ₹ ${(newOrder.gstTotal / 2).toFixed(2)} CGST 9%, ₹ ${(newOrder.gstTotal / 2).toFixed(2)} SGST 9%)`, 50, summaryY + 40);

  // Footer
  doc
    .moveDown(5)
    .fontSize(10)
    .text('Thanks For Shopping With Us!', 50, summaryY + 80)
    .text('For Terms & Conditions Please Visit: https://mmmithaiwala.in/terms/', 50, summaryY + 95);

  doc.end();

  // Wait until it's fully written
  return new Promise((resolve) => {
    writeStream.on('finish', () => resolve(invoicePath));
  });
};

export default generateInvoice;
