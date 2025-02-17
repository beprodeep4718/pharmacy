# Pharmacy Project

![Home Page](client/public/assets/docs-home.png)

This project is a pharmacy management system that includes user authentication and information retrieval.

## Contributing

We welcome contributions from the community! Please follow the steps below to set up the project locally and start contributing.
### Local Setup

1. **Clone the repository:**
  ```bash
  git clone https://github.com/your-username/pharmacy.git
  cd pharmacy
  ```

2. **Install dependencies for the server:**
  ```bash
  cd server
  npm install
  ```

3. **Install dependencies for the client:**
  ```bash
  cd ../client
  npm install
  ```

4. **Set up environment variables:**
  Create a `.env` file in the `server` directory and add the necessary environment variables. Refer to `server/.env.example` for the required variables.

5. **Run the development server:**
  ```bash
  cd ../server
  npm run dev
  ```

6. **Run the client:**
  Open a new terminal and navigate to the `client` directory:
  ```bash
  cd client
  npm start
  ```

7. **Run tests for the server:**
  ```bash
  cd ../server
  npm test
  ```

### Submitting Changes

1. **Create a new branch:**
  ```bash
  git checkout -b feature/your-feature-name
  ```

2. **Make your changes and commit them:**
  ```bash
  git commit -m "Add your commit message"
  ```

3. **Push to your branch:**
  ```bash
  git push origin feature/your-feature-name
  ```

4. **Create a pull request:**
  Go to the repository on GitHub and create a pull request from your branch.



## Table of Contents
- [Overview](#overview)
- [API Documentation](#api-documentation)
  - [User Login](#user-login)
  - [User Registration](#user-registration)
  - [User Information](#user-information)
  - [Reminder Routes](#reminder-routes)
  - [Product Routes](#product-routes)

## Overview
This project provides a backend system for managing a pharmacy, including user authentication and user information retrieval.

## API Documentation

### User Login
**Endpoint:** `/user/login`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- `200 OK` on successful login
- `400 Bad Request` on invalid credentials
- `500 Internal Server Error` on server error

**Example:**
```bash
curl -X POST http://localhost:5000/user/login -d '{"email":"user1@example.com", "password":"password123"}' -H "Content-Type: application/json"
```

### User Registration
**Endpoint:** `/user/register`

**Method:** `POST`

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response:**
- `201 Created` on successful registration
- `500 Internal Server Error` on server error

**Example:**
```bash
curl -X POST http://localhost:5000/user/register -d '{"fullname":{"firstname":"John", "lastname":"Doe"}, "email":"john.doe@example.com", "password":"password123", "phone":"1234567890"}' -H "Content-Type: application/json"
```

### User Information
**Endpoint:** `/user/userinfo`

**Method:** `GET`

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `200 OK` with user information
- `401 Unauthorized` if token is invalid or missing
- `404 Not Found` if user not found
- `500 Internal Server Error` on server error

**Example:**
```bash
curl -X GET http://localhost:5000/user/userinfo -H "Authorization: Bearer <token>"
```

### Reminder Routes

#### Create a Reminder

**URL:** `/reminder/create`

**Method:** `POST`

**Headers:**
- `Content-Type: application/json`
- `Cookie: token=<JWT_TOKEN>`

**Body:**
```json
{
  "medicineName": "Medication Name",
  "times": ["08:00", "20:00"],
  "frequency": "daily"
}
```

**Response:**
- `201 Created` on success
- `401 Unauthorized` if no token is provided
- `400 Bad Request` if the token is invalid

#### Get All Reminders

**URL:** `/reminder/getAll`

**Method:** `GET`

**Headers:**
- `Cookie: token=<JWT_TOKEN>`

**Response:**
- `200 OK` with a list of reminders
- `401 Unauthorized` if no token is provided
- `400 Bad Request` if the token is invalid

#### Delete a Reminder

**URL:** `/reminder/delete/:id`

**Method:** `DELETE`

**Headers:**
- `Cookie: token=<JWT_TOKEN>`

**Response:**
- `200 OK` on successful deletion
- `401 Unauthorized` if no token is provided
- `400 Bad Request` if the token is invalid

### Product Routes

#### Create a Product

**URL:** `/api/products`

**Method:** `POST`

**Headers:**
- `Content-Type: multipart/form-data`

**Body:**
- `image`: Image file
- `data`: JSON string containing product details

**Example:**
```json
{
  "name": "Product Name",
  "category": "Category",
  "price": 100,
  "discount": 10,
  "stock": 50,
  "manufacturer": "Manufacturer",
  "expiryDate": "2023-12-31",
  "countryOfOrigin": "Country",
  "description": "Product description",
  "usage": "Usage instructions",
  "sideEffects": "Possible side effects"
}
```

**Response:**
- `201 Created` on success
- `400 Bad Request` if image or data is missing
- `500 Internal Server Error` on server error

#### Get All Products

**URL:** `/api/products`

**Method:** `GET`

**Response:**
- `200 OK` with a list of products
- `500 Internal Server Error` on server error

#### Get Product by ID

**URL:** `/api/products/:id`

**Method:** `GET`

**Response:**
- `200 OK` with product details
- `404 Not Found` if product not found
- `500 Internal Server Error` on server error

#### Update Product

**URL:** `/api/products/:id`

**Method:** `PUT`

**Body:**
```json
{
  "name": "Updated Product Name",
  "category": "Updated Category",
  "price": 120,
  "discount": 15,
  "stock": 60,
  "manufacturer": "Updated Manufacturer",
  "expiryDate": "2024-12-31",
  "countryOfOrigin": "Updated Country",
  "description": "Updated description",
  "usage": "Updated usage instructions",
  "sideEffects": "Updated possible side effects"
}
```

**Response:**
- `200 OK` on successful update
- `404 Not Found` if product not found
- `500 Internal Server Error` on server error

#### Delete Product

**URL:** `/api/products/:id`

**Method:** `DELETE`

**Response:**
- `200 OK` on successful deletion
- `404 Not Found` if product not found
- `500 Internal Server Error` on server error

