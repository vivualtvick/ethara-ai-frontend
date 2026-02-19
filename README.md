# Next.js Project – Local Development Setup

This document provides instructions to run the Next.js project locally for development purposes.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (v16 or higher recommended)
- npm (comes bundled with Node.js)

Verify installation:
```bash
node -v
npm -v
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [https://github.com/vivualtvick/ethara-ai-frontend.git](https://github.com/vivualtvick/ethara-ai-frontend.git)
cd ethara-ai-frontend.git
```

### 2. Install Dependencies

```
cd frontend
npm install
```
#### This installs all required dependencies listed in package.json.

### Environment setup
```bash
touch .env.local

# Add varible in local file
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Running the Project Locally

### ⚠️ Important:
#### The project is configured to run locally only using the development server.

### Start Development Server

```npm run dev```

## Once the server starts, open:

http://localhost:3000

Environment Variables (Required) </br>
Create a **.env.local** file in the root directory </br>
Add the required variables

NEXT_PUBLIC_API_URL=http://localhost:8000

## Troubleshooting

### Clear dependencies if issues occur:

```rm -rf node_modules package-lock.json
npm install
```


### Ensure port 3000 is not already in use
