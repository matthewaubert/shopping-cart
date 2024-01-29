# Shopping Cart

Notes and progress for my Shopping Cart app

## Assignment
> Ref: https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart

1. Create a new React project.

1. Think about the component and the folder structure. How could you set up your application? Which components or functionalities do you need? It’s a good idea to note this down somewhere you can easily get to and refer back and add to it to keep track.

1. You should have at least two pages (a home page and a shop page, which includes your shopping cart). Let the user navigate between the pages with a navigation bar, which will be shown on both pages.

1. To your homepage, you can add whatever you’d like! A few images or information will be totally fine; it doesn’t have to be something fancy - it’s to test the concepts taught thus far.

1. On the shopping cart page, you should have the same navigation bar that displays the number of items currently in the cart. You should also have a button next to it where you can go to the cart to checkout and pay (however we are not going to implement this logic here).

1. Build individual card elements for each of your products. Display an input field on it, which lets a user manually type in how many items they want to buy. Also, add an increment and decrement button next to it for fine-tuning. You can also display a title for each product as well as an “Add To Cart” button.

1. Fetch your shop items from FakeStore API or something similar.

1. Once a user has submitted their order, the amount on the cart itself should adjust accordingly.

1. Make sure to test your app thoroughly using the React Testing Library. Be careful not to test react-router-dom directly, since it is an external library and the developers working on it must have tested the library already.

1. As usual, style your application so you can show it off! You have a host of options provided already.

1. Lastly, it’s time to deploy it! Depending on what hosting solution you’re using, you may need some additional configuration so that your routing is handled correctly as a single page application (SPA).

## 1/26/24
### Plan

1. <a href="https://gist.github.com/matthewaubert/e809ae8ccfe41442bb588b3c49d9c63d">Create a new React project</a>

1. Store type and API decisions
   - [x] Research existing product shopping sites and other student submissions for inspiration
   - [x] Decide on a store type
   - [x] Choose a relevant API
   - [x] Study API docs to understand how to pull the information I need

1. Component structure:
   - App
     - Navbar (header)
       - Menu/Categories?
       - SearchBar?
       - CartIcon?
     - HomePage
       - Hero
       - Categories?
     - ShopPage
       - Cards
       - ScrollToTop (button)
     - CartPage
     - Footer

1. Keep in mind to test and type check while creating components
   - [ ] Review material for test-driven development in React
   - [ ] Review material for type checking with PropTypes in React

1. Enable client-side routing
   - [ ] Review material for React Router

### Website Research

Websites I liked:
- <a href="https://www.wayfair.com/">Wayfair</a>
- <a href="https://www.bestbuy.com/">Best Buy</a>
- <a href="https://merry-dolphin-1d55d4.netlify.app/">Audiophile</a> (student example)
- <a href="https://darkwool.github.io/shopping-cart/">Logo Ipsum</a> (student example)
- <a href="https://shopping-cart-e429ti01k-rmathr.vercel.app/">TrendyHaven</a> (student example)
- <a href="https://sharkri.github.io/shopping-cart/">Home Furnishing</a> (student example)

### Deciding on an API

- The Odin Project recommends <a href="https://fakestoreapi.com/">FakeStore API</a>. It's a solid option that would work just fine, though I'm not a huge fan of the images or generic categories...
- I considered the <a href="https://mock.shop/">Mock.shop API</a> because of the image quality and the way the data from the response JSON is organized. But I ultimately decided that using a GraphQL API would be challenging, time-consuming, and a distraction from the new concepts I should be focusing on in this project (i.e. not worth the effort).
- I tried the <a href="https://bestbuyapis.github.io/api-documentation/?javascript#detail">Best Buy API</a>, but they don't allow free accounts to obtain an API key
- In the end, despite my initial misgivings, for the sake of conserving time for other aspects of the project, I opted to simply use the free <a href="https://fakestoreapi.com/">FakeStore API</a> REST API recommended by The Odin Project.

### API Docs Research
> Ref: https://fakestoreapi.com/docs

- Get all products
  ```
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => console.log(json));
  ```
- Get a single product
  ```
  fetch('https://fakestoreapi.com/products/1')
    .then(res => res.json())
    .then(json => console.log(json)); 
  ```
- Limit results
  ```
  fetch('https://fakestoreapi.com/products?limit=5')
    .then(res => res.json())
    .then(json => console.log(json)); 
  ```
- Sort results
  ```
  fetch('https://fakestoreapi.com/products?sort=desc')
    .then(res => res.json())
    .then(json => console.log(json)); 
  ```
- Get all categories
  ```
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => console.log(json)); 
  ```
- Get products in a specific category
  ```
  fetch('https://fakestoreapi.com/products/category/jewelery')
    .then(res => res.json())
    .then(json => console.log(json)); 
  ```