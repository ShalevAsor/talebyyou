import { ProductType } from "@/generated/prisma";

/**
 * Generate a welcome email template for custom books store customers
 * @param userName The user's name
 * @returns HTML string for the welcome email
 */
export const getWelcomeEmailTemplate = (userName: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Welcome to Our Custom Books Store!</h2>
      <p>Hello ${userName},</p>
      <p>Thank you for creating an account with us. We're excited to have you join our community of custom book creators!</p>
      <p>Here's how to create your perfect custom book:</p>
      <ol style="line-height: 1.8;">
        <li><strong>Choose a Book</strong> - Select a story from our curated collection of templates that best suits your child's interests.</li>
        <li><strong>Personalize</strong> - Add your child's name, photo, and customize the details to make the book special and unique to them.</li>
        <li><strong>Preview and Customize</strong> - See how your custom book will look in real-time. Edit the title, text, images, and add dedications or personal messages.</li>
        <li><strong>Place Your Order</strong> - Once you're happy with your customizations, place your order and get ready for a magical book made just for you!</li>
        <li><strong>Create and Edit</strong> - After you place your order, we'll create the remaining images for your book. Continue making edits until you're completely satisfied, then send for printing or download as an eBook.</li>
      </ol>
      <p>We add new book templates every week or two, so check back often to see what's new!</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/library" style="background-color: #4F46E5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Explore Our Library
        </a>
      </div>
      <p>If you have any questions or need assistance, feel free to reply to this email or contact our support team.</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">© ${new Date().getFullYear()} Custom Books Store. All rights reserved.</p>
    </div>
  `;
};

/**
 * Generate an order confirmation email template for custom books
 * @param userName The user's name
 * @param orderNumber The human-readable order number (e.g., ORD-999964-3750)
 * @param orderDetails Order information including book title, type, and price
 * @returns HTML string for the order confirmation email
 */
export const getOrderConfirmationEmailTemplate = (
  orderNumber: string,
  productType: ProductType,
  bookTitle: string,
  price: number,
  fullName?: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Your Order Confirmation</h2>
      <p>Hello ${fullName},</p>
      <p>Thank you for your order! We're excited to confirm your purchase and are now working on generating the remaining images for your custom book.</p>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Order Details</h3>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Book Title:</strong> ${bookTitle}</p>
        <p><strong>Product Type:</strong> ${productType}</p>
        <p><strong>Price:</strong> $${price.toFixed(2)}</p>
      </div>
      
      <h3 style="color: #333;">What Happens Next?</h3>
      <ol style="line-height: 1.6;">
        <li><strong>Image Generation:</strong> Our system is now creating the remaining images for your book. This process takes a few minutes to complete.</li>
        <li><strong>Customization:</strong> Once the images are ready, you can continue to customize your book. You can add text, adjust images, and make other edits until you're completely satisfied.</li>
        <li><strong>Finalization:</strong> When you're happy with your book, you can ${
          productType === ProductType.EBOOK
            ? "save and download your eBook from your account."
            : "send it for printing. We'll notify you once your book has been shipped."
        }</li>
      </ol>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/my-books" style="background-color: #4F46E5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          View My Books
        </a>
      </div>
      
      <p>If you have any questions or need assistance with your order, please reply to this email or contact our support team.</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">© ${new Date().getFullYear()} Custom Books Store. All rights reserved.</p>
    </div>
  `;
};

/**
 * Generate an email template for when a user completes their book customization
 * @param fullName The user's full name
 * @param bookTitle The title of the customized book
 * @param productType The type of product (EBOOK or PHYSICAL)
 * @param downloadLink The download link for the ebook
 * @returns HTML string for the book completion email
 */
export const getBookCompletionEmailTemplate = (
  fullName: string,
  bookTitle: string,
  productType: ProductType,
  downloadLink: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Your Book is Ready!</h2>
      <p>Hello ${fullName},</p>
      <p>Great news! Your customized book "${bookTitle}" is now complete${
    productType === ProductType.BOOK ? " and has been sent for printing" : ""
  }.</p>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Book Information</h3>
        <p><strong>Title:</strong> ${bookTitle}</p>
        <p><strong>Format:</strong> ${
          productType === ProductType.BOOK
            ? "Printed Book with eBook included"
            : "eBook"
        }</p>
      </div>
      
      <h3 style="color: #333;">Download Your eBook</h3>
      <p>Your eBook is now ready for download. You can access it in two ways:</p>
      <ol style="line-height: 1.6;">
        <li><strong>Direct Download:</strong> Click the button below to download your eBook immediately.</li>
        <li><strong>From Your Account:</strong> You can always access your eBooks from the "My Books" section of your account.</li>
      </ol>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${downloadLink}" style="background-color: #4F46E5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin-bottom: 15px;">
          Download Your eBook
        </a>
        <br>
        <a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/my-books" style="background-color: white; color: #4F46E5; border: 1px solid #4F46E5; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
          View in My Books
        </a>
      </div>
      
      ${
        productType === ProductType.BOOK
          ? `
      <h3 style="color: #333;">Your Printed Book</h3>
      <p>In addition to your eBook, your physical copy is being prepared. Here's what happens next:</p>
      <ol style="line-height: 1.6;">
        <li><strong>Printing:</strong> Your book will be professionally printed on high-quality paper.</li>
        <li><strong>Quality Check:</strong> Our team will inspect your book to ensure it meets our standards.</li>
        <li><strong>Shipping:</strong> Once approved, your book will be carefully packaged and shipped to your address.</li>
      </ol>
      <p>You'll receive a shipping confirmation email with tracking information once your book is on its way.</p>
      `
          : ""
      }
      
      <h3 style="color: #333;">Need Help?</h3>
      <p>If you have any questions or need assistance, please reply to this email or contact our support team.</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="text-align: center; margin: 20px 0;">Thank you for creating with us!</p>
      <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Custom Books Store. All rights reserved.</p>
    </div>
  `;
};
/**
 * Generate a shipping confirmation email template for physical book orders
 * @param fullName The user's full name
 * @param orderNumber The human-readable order number (e.g., ORD-999964-3750)
 * @param bookTitle The title of the customized book
 * @param trackingNumber The shipping tracking number (optional)
 * @param trackingUrl The URL to track the shipment (optional)
 * @param carrierName The name of the shipping carrier (optional)
 * @param estimatedDelivery The estimated delivery date (optional)
 * @returns HTML string for the shipping confirmation email
 */
export const getShippingConfirmationEmailTemplate = (
  fullName: string,
  orderNumber: string,
  bookTitle: string,
  trackingNumber?: string,
  trackingUrl?: string,
  carrierName?: string,
  estimatedDelivery?: string
): string => {
  // Helper function to check if a value exists and is not empty
  const hasValue = (value?: string): boolean => {
    return !!value && value.trim() !== "";
  };

  // Build the shipping information section dynamically
  let shippingInfoContent = `
    <p><strong>Order Number:</strong> ${orderNumber}</p>
    <p><strong>Book Title:</strong> ${bookTitle}</p>
  `;

  // Only add carrier if it has a value
  if (hasValue(carrierName)) {
    shippingInfoContent += `<p><strong>Carrier:</strong> ${carrierName}</p>`;
  }

  // Only add tracking number if it has a value
  if (hasValue(trackingNumber)) {
    shippingInfoContent += `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>`;
  }

  // Only add estimated delivery if it has a value
  if (hasValue(estimatedDelivery)) {
    shippingInfoContent += `<p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>`;
  }

  // Only create the tracking button if we have a valid URL
  const trackingButton = hasValue(trackingUrl)
    ? `
        <a href="${trackingUrl}" style="background-color: #4F46E5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin-bottom: 15px;">
          Track Your Package
        </a>
        <br>
      `
    : "";

  // Modify the "What's Next?" section based on available data
  let whatsNextContent = `
    <ol style="line-height: 1.6;">
  `;

  if (hasValue(estimatedDelivery)) {
    whatsNextContent += `<li><strong>Delivery:</strong> Your book is expected to arrive by ${estimatedDelivery}. Delivery times may vary based on your location.</li>`;
  } else {
    whatsNextContent += `<li><strong>Delivery:</strong> Your book is on its way. Delivery times may vary based on your location.</li>`;
  }

  whatsNextContent += `
      <li><strong>Package Receipt:</strong> Once delivered, your book will be packaged securely to prevent damage during transit.</li>
      <li><strong>Enjoy Your Book:</strong> Open and enjoy your personalized creation! Remember, you can always access the digital version from your account.</li>
    </ol>
  `;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Your Book is on the Way!</h2>
      <p>Hello ${fullName},</p>
      <p>Great news! Your custom printed book "${bookTitle}" has been shipped and is on its way to you.</p>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Shipping Information</h3>
        ${shippingInfoContent}
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        ${trackingButton}
        <a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/my-books" style="background-color: white; color: #4F46E5; border: 1px solid #4F46E5; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
          View Order Details
        </a>
      </div>
      
      <h3 style="color: #333;">What's Next?</h3>
      ${whatsNextContent}
      
      <div style="background-color: #fcf8e3; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #ffc107;">
        <p style="margin: 0;"><strong>Note:</strong> If you face any issues with your delivery or have questions about your order, please contact our support team immediately.</p>
      </div>
      
      <h3 style="color: #333;">Need Help?</h3>
      <p>If you have any questions or need assistance, please reply to this email or contact our support team.</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="text-align: center; margin: 20px 0;">Thank you for creating with us!</p>
      <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Custom Books Store. All rights reserved.</p>
    </div>
  `;
};

/**
 * Generate an email template for contact form submissions
 * @param name Sender's name
 * @param email Sender's email address
 * @param category The category of the inquiry
 * @param subject The subject of the message
 * @param message The message content
 * @param orderNumber Optional order number for order-related inquiries
 * @returns HTML string for the contact form email
 */
export const getContactFormEmailTemplate = (
  name: string,
  email: string,
  category: string,
  subject: string,
  message: string,
  orderNumber?: string
): string => {
  // Format the category name from snake_case to Title Case
  const formattedCategory = category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${formattedCategory}</p>
        ${
          orderNumber
            ? `<p><strong>Order Number:</strong> ${orderNumber}</p>`
            : ""
        }
        <p><strong>Subject:</strong> ${subject}</p>
      </div>
      
      <div>
        <h3 style="color: #333;">Message</h3>
        <div style="background-color: #f7f7f7; padding: 15px; border-radius: 4px; white-space: pre-line;">${message}</div>
      </div>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">© ${new Date().getFullYear()} Custom Books Store. All rights reserved.</p>
    </div>
  `;
};
