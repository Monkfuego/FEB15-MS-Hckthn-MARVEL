# Virtual Art Gallery and Marketplace (Strange Market)

## Login and Signup:
- Creative login and signup pages.
- User authentication with hash-encrypted login details stored in MongoDB.
- Redirects to the signup page if not signed up, and to the login page after successful signup.
- Redirects to the homepage after successful login.

## Homepage for Customers:
- Carousel display of best selling paintings of the month after successful login.
- Preview of each artwork with price (in rupees and dollars), discounts, and "add to cart" option.
- Sorting options available based on price, rating, and cost.

## Order Page for Customers:
- Order summary with items, total cost, shipping charges, and payment options.
- Payment options include UPI, credit card, and debit card (using Razorpay).
- Redirects to payment portal for transactions.
- Payment confirmation page after successful transaction.
- Email notification to registered email ID regarding purchase, using Mailgun API with MongoDB integration.

## Technology Used
- Node.js
- Express.js
- MongoDB (connected to MongoDB Atlas for cloud deployment)
- HTML
- CSS
- JavaScript
- SCSS
- Bcrypt for hashing passwords
- Vector field methods
- Favicon integration
- Google API (for integration purposes)
- Razorpay API (for payment gateway integration)
- Psyclick for deployment
- Cyclic.ash (for cyclic task scheduling)
