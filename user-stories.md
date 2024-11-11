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