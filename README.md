# Sauti Africa Marketplace

## Instructions

### Project Setup for work on specific/individual feature branches

* [] Clone this repository.
- [] Create a new branch for the feature you are working on: git checkout -b `<feature-name>`.
- [] Implement your code on your newly created `<feature-name>` branch, committing changes regularly.
- [] Push commits: git push origin `<feature-name>`.
* [] **RUN** `npm start` to start your application in development mode. If your code editor is not already pre-configured to do so, you will need to open `http://localhost:5500` in your browser.

### Reference Materials

Sauti Market is an ecommerce app designed for users (small business owners) to be able to sign up and list their items for sale. Currently, users are able to login as either owners or regular users (non-owners); users are able to list items for sale, which appear in the component titled "Shop." Users are also able to edit and delete listed items.


#### API Documentation and Endpoints

* [POST] to `https://saudi-market-app.herokuapp.com/api/auth/register`
  // to register
* [POST] to `https://saudi-market-app.herokuapp.com/api/auth/login`
  // to login

* [GET] ALL ITEMS: `https://saudi-market-app.herokuapp.com/api/items`
  // returns array of all items
* [GET] ITEMS BY ID: `https://saudi-market-app.herokuapp.com/api/items/:id`
  // returns item object
* [POST] ITEM NEW ITEM: `https://saudi-market-app.herokuapp.com/api/items`
  // returns item object
* [PUT]  UPDATE ITEM: `https://saudi-market-app.herokuapp.com/api/items/:id`
  // returns item object
* [DELETE] DELETE ITEM: `https://saudi-market-app.herokuapp.com/api/items/:id`
  // returns delete message

