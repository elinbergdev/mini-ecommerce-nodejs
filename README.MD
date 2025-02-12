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
npm install
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
├── models/
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

## Discounts Logic

1. Visit-based discount:
   - First visit: No discount
   - Subsequent visits: 10% discount

2. Day-based discount:
   - Friday: Additional 5% discount
   - Other days: No additional discount

Discounts are cumulative, so a repeat visitor on Friday gets a 15% total discount.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## Troubleshooting

1. Redis Connection Issues:
   - Check if Redis is running: `ps aux | grep redis`
   - Check Redis logs: `tail -f /usr/local/var/log/redis.log`
   - Verify Redis configuration: `cat /usr/local/etc/redis.conf`

2. API Issues:
   - Check server logs
   - Verify environment variables
   - Ensure Redis connection is established

## License

MIT

## Support

For support, please open an issue in the repository or contact the maintainers.
