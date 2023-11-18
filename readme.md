# Product Management App

This is a Node.js application with MongoDB integration for managing products. The application provides a set of API endpoints to perform CRUD operations on products.

## API Endpoints

### Get products

- **Endpoint**: `/api/products`
- **Method**: `GET`
- **Description**: Retrieve a list of all products with optional search and sorting parameters.
- **Parameters**:
  - `search` (optional): Search for products by name or description.
  - `sort` (optional): Sort the results by "name" or "date".
  - `order` (optional): Sort order, either "asc" (ascending) or "desc" (descending).
  - `page` (optional): Page number for pagination.

### Get a product by ID

- **Endpoint**: `/api/products/:productId`
- **Method**: `GET`
- **Description**: Retrieve a specific product by its ID.

### Add a new empty product

- **Endpoint**: `/api/products/addNewProduct`
- **Method**: `POST`
- **Description**: Add a new empty product with the current creation date.

### Update product information

- **Endpoint**: `/api/products/updateProduct/:productId`
- **Method**: `POST`
- **Description**: Update the information of a specific product by its ID.

### Delete a product

- **Endpoint**: `/api/products/deleteProduct/:productId`
- **Method**: `DELETE`
- **Description**: Delete a specific product by its ID.

## Folder Structure

- `controllers`: Contains route handlers for each API endpoint.
- `middleware`: Global error handler for the application.
- `models`: Defines the MongoDB schema for the `Product` model.
- `routers`: Defines the API routes for products.
- `db`: Database connection setup.
- `utils`: Error handler for endpoints.
- `app.js`: Express application setup.
- `index.js`: Entry point to start the server.

## Dependencies

- Express: Web application framework.
- Mongoose: MongoDB object modeling for Node.js.
- Cors: Middleware for handling Cross-Origin Resource Sharing.
- Dotenv: Environment variable management.
- Nodemon: Utility that monitors for changes and automatically restarts the server.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shaharyair/app-products-demo-server.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the MongoDB connection:**

   Replace the placeholder values in the `.env` file with your MongoDB connection URL and desired port.

   ```env
   DATABASE_URL = mongodb+srv://<username>:<password>@<your-mongodb-url>/Products
   PORT = <port> (optional)
   ```

## Usage

1. **Start the application:**

   ```bash
   npm run start
   ```

2. The application will be running on [http://localhost:3000](http://localhost:3000) by default with nodemon.

## Additional Information

If you are intrested in the client-side repository, you can find it [here](https://github.com/shaharyair/app-products-demo-client).

Feel free to explore, enhance, and customize the application to meet your specific needs!
