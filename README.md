# Shopping Cart

**[Click here to view the live site](https://shopping-cart-ma.pages.dev/)**

[![screenshot of home page](docs/images/home-page.png)](https://shopping-cart-ma.pages.dev/ "home page")
[![screenshot of shop page](docs/images/shop-page.png)](https://shopping-cart-ma.pages.dev/shop/all-products "shop page")

## How to Use

1. [Head to the live site](https://shopping-cart-ma.pages.dev/) on any device (mobile, tablet or desktop - it doesn't matter)
1. Click on the **SHOP NOW** button on the left-hand side or click on any of the category links up top
1. If you like a product, click on the **Add to Cart** button, enter the quantity you'd like to "purchase", and then click **Submit**. The item will be added to your cart and you'll see a quantity appear on the shopping cart icon in the upper-right corner of the screen. Add and remove as many items as you like to your cart!
1. To view your cart, click on the icon in the upper-right corner of the screen. A pop-up will show you all of the products, amounts, and prices of every item; as well as a grand total price.
1. There's no back end (and these aren't real products anyway!), so you cannot actually checkout. Bu click on the **Checkout** button anyway for a special surprise &#128521;

https://github.com/matthewaubert/shopping-cart/assets/132402803/21b28a14-355a-4dc5-9f1a-d82e3456495c

## About This Project

This project was built as part of [The Odin Project: React course](https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart) in order to implement what I've learned about testing, type checking, client-side routing, and fetching data in React.

I later came back to this project and refactored it to TypeScript as a way to learn the language. It seemed like a natural progression from the type checking I had initially done.

## Technologies Used

### Languages
- TypeScript / JavaScript
- CSS
- HTML
- Bash - for writing a script that generates a `.tsconfig-lint.json` file that lints individual or smaller groups of TypeScript files at a time in the CLI. (By default TypeScript does not support linting individual files in the CLI, and seeing type errors for _all_ files at once was overwhelming.)

### Libraries and Tools
- React
- Vite - for project scaffolding and development
- Git (obviously)
- Vitest - for testing components
- React Testing Library, jest-dom - for testing components
- React Router - for client-side routing
- React PropTypes - for type checking before TypeScript refactor


## Understanding the Problem

Create a mock shopping cart web app.

My app should include:
- A home page
- A shop page
- A navigation bar, which will be shown on both pages
  - It should include a shopping cart icon that displays the number of items currently in the cart. Once a user submits his/her order, the amount on the cart itself should adjust accordingly.
  - The user should be able to click on the cart to checkout and pay (however, I won't implement that functionality here)
- Card elements for each of my products on the shop page. Each one should include:
  - An input field, which lets a user manually type in the quantity they want to buy
  - Increment and decrement buttons for fine-tuning
  - A title
  - An "Add to cart" button
  - My shop items and related information should be fetched from [FakeStore API](https://fakestoreapi.com/) or something similar

## Plan

Review my [notes](docs/notes.md) to see my planning process.

## Credits

- Product information and images from [FakeStore API](https://fakestoreapi.com/)

- Home background image by [lookstudio](https://www.freepik.com/free-photo/portrait-curly-pink-haired-woman-massive-white-headphones_15971449.htm#from_view=detail_author) on Freepik

- SVG icons from [Pictogrammers](https://pictogrammers.com/library/mdi/)

- Social media icons from [Devicon](https://devicon.dev/") and [Bootstrap](https://icons.getbootstrap.com/)
