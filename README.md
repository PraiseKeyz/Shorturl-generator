# URL Shortener Service

A TypeScript-based URL shortening service that converts long URLs into short, manageable links. Built with Express.js and MongoDB.

## Features

- Convert long URLs to short URLs
- Redirect short URLs to original URLs
- Track click counts
- RESTful API endpoints
- TypeScript support
- MongoDB integration

## API Documentation

You can find the API documentation [here](https://documenter.getpostman.com/view/40640896/2sB2ixkE6u).

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- TypeScript

## Installation

1. Clone the repository or download the source code

2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
```bash
MONGODB_URI=mongodb://localhost:27017
PORT=3000
BASE_URL=http://localhost:3000
```
## Usage
Start your server
```bash
npm start
```

## API Endpoints

### Create short URL
- POST `/shorten`
- Body: `{
    "longUrl": "https://example.com/very/long/url"
}`
- Response: `{
    "urlCode": "abc123",
    "longUrl": "https://example.com/very/long/url",
    "shortUrl": "http://localhost:3000/abc123",
    "createdAt": "2024-01-20T12:00:00.000Z",
    "clicks": 0
}`

### Access short URL
- GET `/:code`
- Reirects to the original URL

## Project Structure

shortURL-generator/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   └── urlController.ts
│   ├── routes/
│   │   └── urlRoutes.ts
│   ├── types/
│   │   └── url.ts
│   └── app.ts
├── .env
├── package.json
└── tsconfig.json

## License
ISC

## Author
PraiseKeyz 🎹
