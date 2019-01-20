# Online Marketplace

This app showcases an implementation of an online marketplace. 

### Technology Stack
- TypeScript (Transpiled to JavaScript)
- Node.js
- GraphQL
- Firebase Functions

### Setup
To run the GraphQL API locally, navigate to the `server` directory, install dependencies, and serve the API.
```bash
cd server
npm install
npm run serve
```

Proceed to `localhost:4000/graphql` to access the playground. The following features are implemented on GraphQL:
- Viewing all products (with the option to exclude products with empty inventory)
- Viewing one product by title
- "Purchasing" a product, which decrements the inventory count by 1

A sample set of products are already available in a Firebase Real Time Database. To add a product to the database, simply send a POST request similar to the following:
```bash
curl -X POST -H "Content-Type:application/json" https://us-central1-shopify-challenge-s19.cloudfunctions.net/addProduct -d '{"title":"item10","price":3.23,"inventory":4}'
```

### GraphQL Schema
```
type Product {
  title: String
  price: Float
  inventory_count: Int
}
type Query {
  product(title: String): Product
  allProducts(allowEmpty: Boolean = true):[Product]
}
type Mutation {
  purchaseProduct(title: String): Product
}
```

### Sample Product Query
```
query {
  allProducts(allowEmpty: true) {
    title
    inventory_count
    price
  }
  product(title: "item0") {
    title
    price
  }
}
```

### Sample Product Purchase
```
mutation {
  purchaseProduct(title: "item1") {
    title
    inventory_count
  }
}
```
