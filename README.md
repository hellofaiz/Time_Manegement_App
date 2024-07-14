# Task Management System

This project is a Task Management that allows users to manage their tasks efficiently. It features Firebase authentication using Google , and has been deployed on Vercel.

### Features

- User authentication with Firebase (Google)
- Task creation, editing, and deletion
- Responsive design

## Technologies Used

### Frontend:

- React
- firebase
- jsonwebtoken
- Axios
- React Router DOM
- React Toastify

## Installation

To get the project up and running locally, follow these steps:

- Clone the repository:

        git clone https://github.com/yourusername/task-management-system.git

- cd task-management-system
- Install the dependencies:

  npm install

- Set up the environment variables

        VITE_APP_FIREBASE_API_KEY=your_api_key
        VITE_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        VITE_APP_FIREBASE_PROJECT_ID=your_project_id
        VITE_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_APP_FIREBASE_APP_ID=your_app_id
        VITE_APP_MEASUREMENT_ID=your_measurement_id
        VITE_SERVER_URL=your_server_url

- Start the development server:

  npm start

## Usage

Once the development server is running, you can access the application at http://localhost:5173. You will be able to sign up or log in using Google authentication.

### Note:-

    This is ony frontend part to run application bug free and smoothly, configure backend server as well from this repository :
    https://github.com/hellofaiz/Time_Manegement_App_Server
