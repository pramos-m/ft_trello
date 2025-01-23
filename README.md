# ft_trello

## Description

ft_trello is a web application designed to manage lists of tasks in different states.

## Technologies Used

- **MongoDB**: NoSQL database for storing user and tournament data
- **Express.js**: Backend framework for building RESTful APIs
- **React**: Frontend library for building the user interface
- **Node.js**: JavaScript runtime for the backend server

## Installation Instructions

### Prerequisites

- Docker
- Docker Compose

### Step-by-Step Guide

1. **Clone the Repository**

   ```sh
   git clone https://github.com/pramos-m/ft_trello.git
   cd ft_trello
   ```

2. **Set Up Environment Variables**

   ```sh
   cp .env.example .env
   ```

3. **Build and Run Docker Containers**

   ```sh
   docker-compose up --build
   ```

### Accessing the Application

Open your web browser and navigate to `http://localhost:3000` to access the ft_trello application.
