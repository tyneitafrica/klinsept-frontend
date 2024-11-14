# pages on the website

## Landing page

1. #### Banner
2. #### Sample cards
3. #### Good service
4. #### products by categories
4. #### Gallery section
4. #### Top products
4. #### Blogs page
4. #### Testimonials


## Login page
✅ enter your email and password

## Register page
- ✅ User can enter the following:
    - first name ✔️
    - Last name ✔️
    - email address ✔️
    - phone-number ✔️
    - password ✔️
    - confirm password ✔️

## Forgot password page
- ✅  Enter your email to get a password reset email
- ✅  Follow instructions on the email to reset password

## Reset password page
- ✅ enter your new password and confirm password
- ✅ Takes otp from the params link

## About-us page
- ✅ Short description of the company
- ✅ vision, goal and mission statement
- ✅ fun facts about us
- ✅ our products descrition by category
- ✅ Team members
- ✅ Clients we have worked with

## Contact us
- ✅ Google Map integration
- ✅ Socials, addresses, email and phone-numnber
<!-- - ⬜  -->

## products page
- ✅ 3 diffrent kinds of views
- ✅ sort by price (ascending and descending)
- ✅ filter items based on categories


## My Account
- > 🚫 Use protected routes for this page

    ```js
    if (loggedIn){//actual page
    } else {//please login
    }
    ```

## Blogs
- ✅ List of some blogs on our site
- > 🚫 Single Blog not showing actual page

## Compare, Wishlist & Cart

## Checkout 
- ✅ Autopopulate with data from user object
    - names `First & last names`
    - phone-number 
    - email address
    - addresses `country, state, Town, street-address, zip-code`
- ✅ Send the cart items to the backend


# place order process
1. Add items to cart
2. proceed to cart and modify anything there
3. checkout and add delivery details
4. if user is logged in take the user object in local storage else redirect to login but save the delivery details for return
5. send the `products` object, `user` object and delivery details to backend








For building an e-commerce website, gathering detailed information from the client is crucial to ensuring the project meets their needs and expectations. Here’s a comprehensive list of questions and requests you can send to your client based on the development tasks and features you've outlined.

---

### **General Information:**
1. **Company Details**:
   - What is your company's full name, and how do you want it displayed on the site?
   - Please provide a brief description of your company for the “About Us” page.
   
2. **Branding**:
   - Do you have a specific color scheme, logo, or branding guidelines we should follow on the website?
   - What font styles do you use in your marketing materials (e.g., header fonts, body fonts)?

3. **Website Structure**:
   - Can you confirm the desired menu structure for the website? (e.g., Home -> About Us -> Products -> Shop -> Contact Us)
   - Would you prefer to add or modify any sections (e.g., a "Why Us" section)? If so, what should be highlighted there?
   - Can you provide the specific wording for your “Why Us” section? (e.g., Quick delivery, 24/7 support, money-back guarantee, etc.)

4. **Content**:
   - Do you have any content or images ready for the homepage slider, or would you like us to suggest options for product images and copy?
   - Do you have any existing photos of your products for use in the product gallery?

---

### **E-commerce Functionality:**
1. **Product Information**:
   - How do you want the products to be categorized? Can you provide a list of product categories and subcategories (e.g., detergents, antiseptics, etc.)?
   - Will you be offering product variants (e.g., size, color)? If so, can you provide the necessary details for each product?
   - Do you need a product filtering system (e.g., by price, category, size)?

2. **Pricing & Currencies**:
   - Can you confirm if products should be priced in both USD and Burundian Francs? Should it automatically switch based on location?
   - If so, should local customers see prices in Burundian Francs and international customers in USD, or would you prefer another setup?

3. **Shipping**:
   - Please confirm the regions where you will deliver (e.g., Burundi, Rwanda, Uganda, Tanzania, etc.).
   - Do you have specific shipping costs for each region or will the system calculate shipping based on the weight/size of the order?
   - How do you want shipping options displayed (e.g., free shipping for orders above a certain amount, standard shipping rates)?

4. **Payments**:
   - Which payment gateways would you like to integrate (e.g., PayPal, Stripe, local payment methods)?
   - Are there any specific payment methods preferred by local customers (e.g., mobile money, bank transfer)?
   - Would you like to implement cash-on-delivery as a payment option?

5. **Client Account Features**:
   - Would you like customers to create an account for quicker checkouts, order tracking, and purchase history?
   - Do you want the “Client Portal” to have additional features (e.g., order tracking, saved addresses, order history)?
   
---

### **Localization & Language Support:**
1. **Language Support**:
   - Would you like the website to be available in French, English, and Swahili?
   - Do you need to add language-specific content (e.g., different offers or promotions based on region or language)?
   - Should the language be automatically detected based on location, or would you like users to choose their language preference manually?

2. **Regional Presence**:
   - How would you like to highlight your regional presence on the homepage or other pages? (e.g., a slider or banner showing the countries you deliver to)

---

### **Design & User Interface:**
1. **Design Preferences**:
   - Do you have any specific design inspirations or websites you would like us to consider as examples?
   - What kind of visual style would you prefer for the homepage slider? (e.g., product showcase, location-based delivery info, special offers)

2. **Footer Information**:
   - Please confirm the details you’d like to display in the footer, such as:
     - Contact information
     - Social media links
     - Opening hours (Do you have your store hours or would you like to display customer service hours?)
     - Branch locations

---

### **Social Media & Communication:**
1. **WhatsApp Integration**:
   - Do you want a WhatsApp chat widget to be added? Would you like it to pop up automatically or as a button that users can click for support?
   
2. **Customer Support**:
   - Do you want a live chat feature on the website, and if so, which support platform would you prefer?
   - Would you like to provide a contact number, email, or both for customer inquiries?

---

### **Additional Features & Requests:**
1. **Security & Privacy**:
   - Are there any specific privacy policies or terms and conditions you'd like to include on the site?
   - Would you need any specific security features (e.g., SSL certificate, two-factor authentication for user accounts)?

2. **SEO & Marketing**:
   - Do you want the website optimized for SEO? If so, please provide any keywords you want to target.
   - Would you like to add a newsletter sign-up form for future marketing campaigns?

3. **Other Requests**:
   - Are there any other functionalities you’d like to include? (e.g., loyalty programs, product reviews, order status notifications)

---

### **Final Preparations**:
1. **Content Delivery**:
   - Please confirm the timeline for providing the content (e.g., images, descriptions, pricing details).
   - Can you provide any additional details about your branches/locations, including addresses, contact info, and operating hours, to be included in the footer or other sections?

---

This list will guide you in gathering all the necessary details from your client to ensure the website is tailored to their needs and functions optimally for their customers. Let me know if you need further adjustments or additional questions!