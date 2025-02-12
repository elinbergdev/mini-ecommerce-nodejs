# Dynamic Pricing API

A Node.js Express API with TypeScript that implements dynamic pricing logic based on user visits and day of the week. The project uses Redis for tracking user visits and applies discounts accordingly.

## Features

- RESTful API endpoints for product management
- Dynamic pricing based on:
  - 10% discount for repeat product visits
  - Additional 5% discount on Fridays
- Redis integration for visit tracking
- Pagination support for product listings
- TypeScript for type safety
- Clean architecture with controllers, services, and routes

## Prerequisites

- Node.js (v14 or higher)
- Redis (v6 or higher)
- TypeScript
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dynamic-pricing-api
```

2. Install dependencies:
```bash
yarn install
```

3. Install and Setup Redis on Mac:
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Redis
brew install redis

# Start Redis server
brew services start redis

# Verify Redis is running
redis-cli ping  # Should return "PONG"
```

4. Create a `.env` file in the root directory:
```env
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Project Structure

```
src/
├── model/
│   └── Product.ts
├── services/
│   ├── redisClient.ts
│   └── productService.ts
├── controllers/
│   └── productController.ts
├── routes/
│   └── productRoutes.ts
├── app.ts
└── server.ts
```

## Development

Start the development server:
```bash
npm run dev
```

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Get Products List
```
GET /api/products
```
Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

Example:
```bash
curl http://localhost:3000/api/products?page=1&limit=10
```

### Get Single Product with Dynamic Pricing
```
GET /api/products/:productId
```
Headers:
- `user-id`: Required for tracking visits

Example:
```bash
curl http://localhost:3000/api/products/1 -H "user-id: 123"
```

## Redis Commands

Common Redis CLI commands for debugging:
```bash
# Access Redis CLI
redis-cli

# List all keys
KEYS *

# Get value for a key
GET keyname

# Delete all keys
FLUSHALL

# Monitor Redis commands in real-time
MONITOR
```

Redis Server Management:
```bash
# Stop Redis server
brew services stop redis

# Restart Redis server
brew services restart redis

# Check Redis status
brew services list
```

## Error Handling

The API includes basic error handling for:
- Invalid product IDs
- Missing user IDs
- Server errors
- Pagination errors

