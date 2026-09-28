# AI-Powered Customer Support Refund System

An AI-powered refund support system that evaluates customer refund requests against predefined business rules, analyzes the customer's message with AI, and stores refund requests and audit logs in MongoDB.

The application is built with React, TypeScript, Express, MongoDB, and OpenAI, and is fully containerized with Docker.

## Features

* Customer refund request submission
* Automated refund policy evaluation
* Order and customer validation
* 30-day refund eligibility window
* Automatic denial for finalized orders
* Automatic escalation for refunds above $500
* AI-powered refund message classification and reasoning
* AI fallback when the AI service is unavailable
* Refund request persistence with MongoDB
* Audit logging
* Input validation with Zod
* Centralized error handling
* Support dashboard for reviewing refund requests
* Search and decision filtering
* Docker and Docker Compose support
* React SPA routing through Nginx

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* Zod
* OpenAI API

### DevOps

* Docker
* Docker Compose
* Nginx

## Architecture

```text
Customer
   │
   ▼
React Support Dashboard
   │
   │ POST /api/refunds
   ▼
Express API
   │
   ▼
Refund Policy Service
   │
   ├── Validate customer/order
   ├── Check refund window
   ├── Check finalized status
   └── Determine refund decision
   │
   ▼
AI Service
   │
   ├── Classify request
   └── Generate reasoning/response
   │
   ▼
MongoDB
   ├── Refund Requests
   └── Audit Logs
```

## Refund Policy

The refund policy service evaluates requests using the following rules:

1. The customer must exist.
2. The order must exist.
3. The order must belong to the requesting customer.
4. Orders finalized within the applicable policy window can be evaluated for refunds.
5. Requests outside the 30-day refund window are denied.
6. Finalized orders are denied.
7. Refunds above $500 are escalated for further review.
8. Eligible requests can be approved.

The final policy decision is passed to the AI service so that the AI does not independently override the business rules.

## AI Service

The AI service analyzes the customer's refund message and returns structured information including:

* Classification
* Reasoning
* Customer response

The AI prompt explicitly instructs the model to treat the customer message as untrusted input and not follow instructions contained inside it.

If the OpenAI service is unavailable, the application falls back to an `AI Unavailable` response instead of preventing the refund request from being stored.

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns the current API status.

### Create Refund Request

```http
POST /api/refunds
```

Request body:

```json
{
  "customerId": "customer-id",
  "orderId": "order-id",
  "message": "I would like a refund for my order."
}
```

### Get Refund Requests

```http
GET /api/refunds
```

Returns stored refund requests.

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

Do not commit your `.env` file to Git.

## Running Locally

### Backend

```bash
cd server
npm install
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

### Frontend

In another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs on the Vite development server.

## Running with Docker

The project includes Dockerfiles for both the frontend and backend.

### Build and start everything

From the project root:

```bash
docker compose up --build
```

The frontend is available at:

```text
http://localhost:3000
```

The backend is available at:

```text
http://localhost:5000
```

### Stop the application

```bash
docker compose down
```

## Docker Services

### Client

The React application is built using a multi-stage Docker build and served with Nginx.

```text
localhost:3000 → Nginx → React application
```

Nginx is configured to support client-side React Router navigation and page refreshes.

### Server

The Express API runs inside a Node.js Alpine container.

```text
localhost:5000 → Express API
```

The backend connects to MongoDB Atlas using the `MONGODB_URI` environment variable.

## Project Structure

```text
ai-refund-support/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Error Handling

The API uses centralized error handling to provide consistent responses for:

* Validation errors
* Unexpected server errors
* Invalid refund request data

Zod is used to validate incoming refund request data before business logic is executed.

## Security Considerations

* Environment variables are used for database and API credentials.
* Secrets are excluded from Docker builds using `.dockerignore`.
* Customer messages are treated as untrusted AI input.
* Business rules are evaluated independently of the AI model.
* AI output is used to provide classification, reasoning, and customer-facing responses rather than overriding the refund policy.

## Future Improvements

Potential improvements include:

* Authentication and role-based access control
* Pagination for refund requests
* More advanced audit-log viewing
* Automated tests
* Rate limiting
* More detailed monitoring and logging
* Human review workflow for escalated refunds
* Production deployment configuration
* More granular refund policies

## Author

Divine Chukwudire
