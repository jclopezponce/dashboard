Admin Dashboard

Overview

Welcome to the Admin Dashboard — a modern, responsive web application designed for efficient data management and visualization. Built with Next.js, TypeScript, and Tailwind CSS, this dashboard offers a clean interface for managing products, customers, and sales data.

Features

Responsive Design: Optimized for both desktop and mobile devices.

Data Visualization: View key metrics such as total sales and order counts.

CRUD Operations: Manage products, customers, and orders seamlessly.

Authentication: Secure login system to protect sensitive data.

Tech Stack

Frontend: Next.js (App Router), TypeScript, Tailwind CSS

Database: Vercel Postgres

UI Components: Shadcn UI

Deployment: Vercel

Analytics: Vercel Analytics

Code Formatting: Prettier

Getting Started
Prerequisites

Ensure you have the following installed:

Node.js (v16 or higher)

npm or yarn

Vercel CLI (optional, for deployment)

Installation

Clone the repository:

git clone https://github.com/yourusername/admin-dashboard.git
cd admin-dashboard


Install dependencies:

npm install
# or
yarn install


Set up environment variables:

Create a .env.local file in the root directory and add your environment variables:

DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000


Run the development server:

npm run dev
# or
yarn dev


Navigate to http://localhost:3000 to view the dashboard.