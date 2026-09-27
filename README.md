# SBA: Build a Product API

## Description

Zenith is a growing e-commerce company that needs a RESTful API to manage its product inventory.

This project is a backend API built with Node.js, Express, and Mongoose. It provides full CRUD functionality for products along with filtering, sorting, and pagination for managing a larger product catalog.

## Features

- Create new products
- Retrieve all products
- Retrieve a single product by ID
- Update existing products
- Delete products
- Filter products by category
- Filter products by minimum price
- Filter products by maximum price
- Sort products by price
- Paginate product results
- MongoDB Atlas database integration
- Mongoose schema validation
- Environment variable configuration
- Modular project structure
- Error handling for invalid requests and missing products

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- JavaScript
- Postman

## Installation

1. Clone the repository:

```bash
git clone <your-github-repository-url>
```

2. Navigate into the project directory:

```bash
cd zenith-product-api
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory.

5. Add your MongoDB connection string and server port:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
```

6. Start the server:

```bash
node server.js
```

The server will run at:

```text
http://localhost:3000
```

## Project Structure

```text
zenith-product-api/
│
├── config/
│   └── connection.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Product Schema

Each product contains the following fields:

| Field | Type | Validation / Default |
|---|---|---|
| `name` | String | Required |
| `description` | String | Required |
| `price` | Number | Required, greater than 0 |
| `category` | String | Required |
| `inStock` | Boolean | Defaults to `true` |
| `tags` | Array of Strings | Optional |
| `createdAt` | Date | Defaults to current date and time |

## API Endpoints

### Create Product

```http
POST /api/products
```

Example request body:

```json
{
    "name": "Wireless Headphones",
    "description": "Bluetooth wireless headphones with noise cancellation",
    "price": 79.99,
    "category": "Electronics",
    "inStock": true,
    "tags": [
        "audio",
        "wireless",
        "headphones"
    ]
}
```

Response status:

```text
201 Created
```

### Get All Products

```http
GET /api/products
```

Returns an array containing all products.

### Get One Product

```http
GET /api/products/:id
```

Returns a single product matching the provided MongoDB ID.

### Update Product

```http
PUT /api/products/:id
```

Example request body:

```json
{
    "name": "Updated Wireless Headphones",
    "description": "Updated Bluetooth wireless headphones",
    "price": 89.99,
    "category": "Electronics",
    "inStock": false,
    "tags": [
        "audio",
        "wireless",
        "headphones"
    ]
}
```

Returns the updated product.

### Delete Product

```http
DELETE /api/products/:id
```

Returns a confirmation message and the deleted product when the deletion is successful.

## Advanced Querying

The `GET /api/products` endpoint supports filtering, sorting, and pagination.

### Filter by Category

```text
GET /api/products?category=Electronics
```

### Filter by Minimum Price

```text
GET /api/products?minPrice=50
```

Returns products with a price greater than or equal to `50`.

### Filter by Maximum Price

```text
GET /api/products?maxPrice=100
```

Returns products with a price less than or equal to `100`.

### Filter by Price Range

```text
GET /api/products?minPrice=50&maxPrice=100
```

Returns products between `$50` and `$100`.

### Sort by Price Ascending

```text
GET /api/products?sortBy=price_asc
```

### Sort by Price Descending

```text
GET /api/products?sortBy=price_desc
```

### Pagination

The default page is `1` and the default limit is `10`.

```text
GET /api/products?page=1&limit=10
```

### Combine Query Parameters

Multiple query parameters can be used together:

```text
GET /api/products?category=Electronics&minPrice=20&maxPrice=200&sortBy=price_asc&page=1&limit=5
```

This request:

- Filters products by the `Electronics` category
- Requires a minimum price of `$20`
- Requires a maximum price of `$200`
- Sorts products from lowest to highest price
- Returns page 1
- Limits the results to 5 products

## Testing

The API was tested using Postman.

The following endpoints should be tested:

```text
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

Advanced query testing:

```text
GET /api/products?category=Electronics
GET /api/products?minPrice=50
GET /api/products?maxPrice=100
GET /api/products?minPrice=50&maxPrice=100
GET /api/products?sortBy=price_asc
GET /api/products?sortBy=price_desc
GET /api/products?page=1&limit=5
GET /api/products?category=Electronics&minPrice=20&maxPrice=200&sortBy=price_asc&page=1&limit=5
```

## Error Handling

The API handles common errors including:

- Invalid MongoDB product IDs
- Product not found
- Validation errors
- Database errors
- Invalid request data

Example error response:

```json
{
    "error": "Product not found"
}
```

## Security

Sensitive environment variables are stored in `.env` and excluded from Git using `.gitignore`.

The following files and directories should not be committed:

```text
node_modules/
.env
```

## Author

Truong Pham
