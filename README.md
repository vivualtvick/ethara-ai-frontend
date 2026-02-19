# Ethara AI Frontend – Local Development Setup

This document provides instructions to run the Next.js project locally for development purposes.

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v16 or higher recommended)
- **npm** (comes bundled with Node.js)

Verify your installations:

```bash
node -v
npm -v
```

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/vivualtvick/ethara-ai-frontend.git
cd ethara-ai-frontend
```
### 2. Install Dependencies
Navigate to the frontend directory and install the required dependencies:
```bash
cd frontend
npm install
```
This installs all required dependencies listed in package.json.

### 3. Environment Setup
Create a local environment file:
```bash
touch .env.local
```
Add the required environment variables:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Running the Project Locally
The project is configured to run locally only using the development server.

#### Start the Development Server
```bash
npm run dev
# Once the server starts, open your browser and navigate to:
http://localhost:3000
```

#### Environment Variables
Create a .env.local file in the frontend directory with the following required variable:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000	# Base URL for backend API
```
__Make sure to replace the URL with your actual backend endpoint if different.__

## Troubleshooting
Clear Dependencies (if issues occur)
```bash
rm -rf node_modules package-lock.json
npm install
```
Common Issues

__Port already in use__: Ensure port 3000 is not occupied by another process

**Missing environment variables**: Verify that .env.local exists and contains the required variables

**Node version mismatch**: Confirm you're using Node.js v16 or higher

## Project Structure
```text
ethara-ai-frontend/
├── frontend/           # Main application directory
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Dependencies and scripts
│   └── .env.local   # Env file
└── README.md          # This file
```
## Available Scripts
Command	Description
```text
npm run dev	# Starts development server
npm run build	# Builds the application for production
npm run start	# Runs the built application in production mode
npm run lint	#Runs the linter
#For additional help or issues, please refer to the Next.js documentation or create an issue in the repository.
```



